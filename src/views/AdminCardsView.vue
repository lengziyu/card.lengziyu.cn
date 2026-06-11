<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AdminShell from '@/components/AdminShell.vue'
import IconSymbol from '@/components/IconSymbol.vue'
import {
  archiveAdminCard,
  listAdminCards,
  resetAdminDemoData,
  type AdminCardRecord,
  type AdminCardStatus
} from '@/api/admin'

const cards = ref<AdminCardRecord[]>([])
const loading = ref(true)
const query = ref('')
const status = ref<'all' | AdminCardStatus>('all')
const resetting = ref(false)

const statusOptions: Array<{ label: string; value: 'all' | AdminCardStatus }> = [
  { label: '全部状态', value: 'all' },
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
  { label: '已下架', value: 'archived' }
]

const statusText: Record<AdminCardStatus, string> = {
  published: '已发布',
  draft: '草稿',
  archived: '已下架'
}

const stats = computed(() => ({
  total: cards.value.length,
  published: cards.value.filter((card) => card.status === 'published').length,
  draft: cards.value.filter((card) => card.status === 'draft').length,
  archived: cards.value.filter((card) => card.status === 'archived').length
}))

const filteredCards = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return cards.value.filter((card) => {
    const matchedKeyword = !keyword || `${card.name} ${card.issuer} ${card.tags.join(' ')}`.toLowerCase().includes(keyword)
    const matchedStatus = status.value === 'all' || card.status === status.value
    return matchedKeyword && matchedStatus
  })
})

async function loadCards() {
  loading.value = true
  try {
    cards.value = await listAdminCards()
  } finally {
    loading.value = false
  }
}

async function handleArchive(card: AdminCardRecord) {
  await archiveAdminCard(card.id)
  await loadCards()
}

async function handleResetDemoData() {
  resetting.value = true
  try {
    await resetAdminDemoData()
    await loadCards()
  } finally {
    resetting.value = false
  }
}

onMounted(loadCards)
</script>

<template>
  <AdminShell title="卡片数据" subtitle="维护发布状态、卡片字段、排行榜分层和官网来源。">
    <template #actions>
      <button class="admin-secondary-action" type="button" :disabled="resetting" @click="handleResetDemoData">
        <IconSymbol name="settings" />
        {{ resetting ? '重置中...' : '重置演示数据' }}
      </button>
      <RouterLink class="admin-primary-action" to="/admin/cards/new">
        <IconSymbol name="card" />
        新增卡片
      </RouterLink>
    </template>

    <section class="admin-stats-grid">
      <article>
        <span>总卡片</span>
        <strong>{{ stats.total }}</strong>
      </article>
      <article>
        <span>已发布</span>
        <strong>{{ stats.published }}</strong>
      </article>
      <article>
        <span>草稿</span>
        <strong>{{ stats.draft }}</strong>
      </article>
      <article>
        <span>已下架</span>
        <strong>{{ stats.archived }}</strong>
      </article>
    </section>

    <section class="admin-toolbar">
      <label>
        <IconSymbol name="search" />
        <input v-model="query" placeholder="搜索卡片、发行方或标签" />
      </label>
      <select v-model="status">
        <option v-for="item in statusOptions" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>
    </section>

    <section class="admin-table-panel">
      <div class="admin-table-head">
        <span>卡片</span>
        <span>分类</span>
        <span>状态</span>
        <span>更新</span>
        <span>操作</span>
      </div>
      <div v-if="loading" class="admin-empty">加载中...</div>
      <div v-else-if="!filteredCards.length" class="admin-empty">没有匹配的卡片</div>
      <template v-else>
        <article v-for="card in filteredCards" :key="card.id" class="admin-card-row">
          <div class="admin-card-title-cell">
            <div class="admin-logo-chip">{{ card.logoText.slice(0, 3) }}</div>
            <div>
              <strong>{{ card.name }}</strong>
              <span>{{ card.issuer }} · {{ card.network }}</span>
            </div>
          </div>
          <span>{{ card.category }}</span>
          <span class="admin-status-pill" :class="`status-${card.status}`">{{ statusText[card.status] }}</span>
          <span>{{ new Date(card.updatedAt).toLocaleDateString('zh-CN') }}</span>
          <div class="admin-row-actions">
            <RouterLink :to="`/admin/cards/${card.id}/edit`">编辑</RouterLink>
            <button v-if="card.status !== 'archived'" type="button" @click="handleArchive(card)">下架</button>
          </div>
        </article>
      </template>
    </section>
  </AdminShell>
</template>
