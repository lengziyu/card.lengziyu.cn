<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AdminShell from '@/components/AdminShell.vue'
import IconSymbol from '@/components/IconSymbol.vue'
import {
  approveCrawlDraft,
  listCrawlDrafts,
  rejectCrawlDraft,
  runMockCrawler,
  type CrawlDraftRecord
} from '@/api/admin'

const drafts = ref<CrawlDraftRecord[]>([])
const loading = ref(true)
const running = ref(false)
const lastMessage = ref('')

async function loadDrafts() {
  loading.value = true
  try {
    drafts.value = await listCrawlDrafts()
  } finally {
    loading.value = false
  }
}

async function handleRunCrawler() {
  running.value = true
  lastMessage.value = ''
  try {
    const draft = await runMockCrawler()
    lastMessage.value = `已生成草稿：${draft.name}`
    await loadDrafts()
  } finally {
    running.value = false
  }
}

async function handleApprove(draft: CrawlDraftRecord) {
  const card = await approveCrawlDraft(draft.draftId)
  lastMessage.value = `已发布：${card.name}`
  await loadDrafts()
}

async function handleReject(draft: CrawlDraftRecord) {
  await rejectCrawlDraft(draft.draftId)
  lastMessage.value = `已忽略：${draft.name}`
  await loadDrafts()
}

onMounted(loadDrafts)
</script>

<template>
  <AdminShell title="爬取草稿" subtitle="爬虫只生成候选数据，发布前需要人工确认费用、权益和来源。">
    <template #actions>
      <button class="admin-primary-action" type="button" :disabled="running" @click="handleRunCrawler">
        <IconSymbol name="search" />
        {{ running ? '爬取中...' : '模拟爬取' }}
      </button>
    </template>

    <p v-if="lastMessage" class="admin-inline-message">{{ lastMessage }}</p>

    <section class="admin-draft-list">
      <div v-if="loading" class="admin-empty">加载中...</div>
      <div v-else-if="!drafts.length" class="admin-empty">当前没有待审核草稿</div>
      <template v-else>
        <article v-for="draft in drafts" :key="draft.draftId" class="admin-draft-card">
          <div class="admin-draft-head">
            <div class="admin-card-title-cell">
              <div class="admin-logo-chip">{{ draft.logoText.slice(0, 3) }}</div>
              <div>
                <strong>{{ draft.name }}</strong>
                <span>{{ draft.issuer }} · {{ draft.category }} · {{ draft.network }}</span>
              </div>
            </div>
            <span class="admin-confidence">{{ draft.confidence }}%</span>
          </div>

          <dl class="admin-draft-meta">
            <div>
              <dt>来源</dt>
              <dd>{{ draft.sourceName }}</dd>
            </div>
            <div>
              <dt>官网</dt>
              <dd>{{ draft.applyUrl }}</dd>
            </div>
            <div>
              <dt>抓取时间</dt>
              <dd>{{ new Date(draft.crawledAt).toLocaleString('zh-CN') }}</dd>
            </div>
          </dl>

          <ul class="admin-draft-summary">
            <li v-for="item in draft.changeSummary" :key="item">{{ item }}</li>
          </ul>

          <div class="admin-row-actions admin-draft-actions">
            <button type="button" @click="handleApprove(draft)">审核通过并发布</button>
            <button type="button" @click="handleReject(draft)">忽略</button>
            <a :href="draft.sourceUrl" target="_blank" rel="noreferrer">查看来源</a>
          </div>
        </article>
      </template>
    </section>
  </AdminShell>
</template>
