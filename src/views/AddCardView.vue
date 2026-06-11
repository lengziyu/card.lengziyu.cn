<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import CardRow from '@/components/CardRow.vue'
import { addCards, categories, type Category } from '@/data/cards'
import { useAuthStore } from '@/composables/useAuthStore'
import { useCardStore } from '@/composables/useCardStore'

const active = ref<Category>('U卡')
const query = ref('')
const showAll = ref(false)
const toast = ref('')
let toastTimer: number | undefined

const { isAuthenticated } = useAuthStore()
const { addCard, isAdded } = useCardStore()

const filteredCards = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return addCards.filter((card) => {
    const matchedCategory = card.category === active.value
    const matchedKeyword = !keyword || `${card.name} ${card.issuer}`.toLowerCase().includes(keyword)
    return matchedCategory && matchedKeyword
  })
})
const visibleCards = computed(() => (showAll.value ? filteredCards.value : filteredCards.value.slice(0, 5)))
const hasMore = computed(() => filteredCards.value.length > visibleCards.value.length)

watch([active, query], () => {
  showAll.value = false
})

function showToast(message: string) {
  toast.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

function handleAdd(card: (typeof addCards)[number]) {
  if (!isAuthenticated.value) {
    showToast('当前未登录，登录后可添加到我的卡片')
    return
  }

  const didAdd = addCard(card.id)
  showToast(didAdd ? `已添加 ${card.name}` : `${card.name} 已在我的卡片中`)
}
</script>

<template>
  <main class="page page-add">
    <PageTitle title="添加卡片" subtitle="选择要添加的卡片类型" />
    <section v-if="!isAuthenticated" class="auth-inline-state">
      <div>
        <strong>当前未登录</strong>
        <span>可以继续浏览卡片，登录后才能添加到我的卡片</span>
      </div>
      <RouterLink to="/login?redirect=/add">去登录</RouterLink>
    </section>
    <SearchBar v-model="query" placeholder="搜索卡片名称或发行机构" />
    <CategoryTabs v-model="active" :categories="categories" />

    <section class="section-head">
      <h2>热门U卡</h2>
      <button v-if="filteredCards.length > 5" type="button" @click="showAll = !showAll">
        {{ showAll ? '收起' : '查看更多 ›' }}
      </button>
    </section>

    <section class="card-list glass-list">
      <CardRow
        v-for="card in visibleCards"
        :key="card.id"
        :card="card"
        mode="add"
        :added="isAuthenticated && isAdded(card.id)"
        @add="handleAdd"
      />
      <div v-if="!filteredCards.length" class="empty-state">
        <strong>没有可添加的卡片</strong>
        <span>换个关键词或分类试试</span>
      </div>
      <button v-else-if="hasMore" class="load-more-button" type="button" @click="showAll = true">展开全部</button>
    </section>

    <Transition name="toast-fade">
      <div v-if="toast" class="toast-message">{{ toast }}</div>
    </Transition>
  </main>
</template>
