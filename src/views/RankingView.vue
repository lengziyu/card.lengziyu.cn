<script setup lang="ts">
import { computed, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import TierList from '@/components/TierList.vue'
import { tierGroups } from '@/data/cards'
import { useAuthStore } from '@/composables/useAuthStore'
import { useCardStore } from '@/composables/useCardStore'

const tab = ref<'mine' | 'all'>('all')
const { myCardIds } = useCardStore()
const { isAuthenticated } = useAuthStore()

const displayedGroups = computed(() => {
  if (tab.value === 'all') return tierGroups
  if (!isAuthenticated.value) return []

  const mine = new Set(myCardIds.value)
  return tierGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => mine.has(item.cardId || item.id))
    }))
    .filter((group) => group.items.length)
})
</script>

<template>
  <main class="page page-ranking">
    <PageTitle title="卡片排行榜" subtitle="按个人使用感受分层（仅供参考）" />
    <div class="segmented-control ranking-segment">
      <button type="button" :class="{ active: tab === 'mine' }" @click="tab = 'mine'">我的卡片</button>
      <button type="button" :class="{ active: tab === 'all' }" @click="tab = 'all'">全部热门卡</button>
    </div>
    <TierList :groups="displayedGroups" />
    <div v-if="tab === 'mine' && !isAuthenticated" class="empty-state ranking-empty">
      <strong>登录后查看我的榜单</strong>
      <span>你的卡片组合会用于筛选排行榜</span>
      <RouterLink class="empty-action-link" to="/login?redirect=/ranking">去登录</RouterLink>
    </div>
    <div v-else-if="!displayedGroups.length" class="empty-state ranking-empty">
      <strong>我的卡片暂未上榜</strong>
      <span>去添加页添加热门卡片后再回来看看</span>
    </div>
  </main>
</template>
