<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryTabs from '@/components/CategoryTabs.vue'
import CardRow from '@/components/CardRow.vue'
import { categories, marketCards, type Category } from '@/data/cards'

const active = ref<Category>('U卡')
const query = ref('')
const showAll = ref(false)
const filteredCards = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return marketCards.filter((card) => {
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
</script>

<template>
  <main class="page page-market">
    <PageTitle title="市场" subtitle="探索市面上热门的卡片" />
    <SearchBar v-model="query" placeholder="搜索卡片名称或发行机构" />
    <CategoryTabs v-model="active" :categories="categories" variant="icons" />

    <section class="section-head">
      <h2>热门推荐</h2>
      <button v-if="filteredCards.length > 5" type="button" @click="showAll = !showAll">
        {{ showAll ? '收起' : '查看更多 ›' }}
      </button>
    </section>

    <section class="card-list glass-list">
      <CardRow v-for="card in visibleCards" :key="card.id" :card="card" />
      <div v-if="!filteredCards.length" class="empty-state">
        <strong>没有找到匹配卡片</strong>
        <span>换个关键词或分类试试</span>
      </div>
      <button v-else-if="hasMore" class="load-more-button" type="button" @click="showAll = true">展开全部</button>
    </section>
  </main>
</template>
