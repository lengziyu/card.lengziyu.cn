<script setup lang="ts">
import { tierGroups, type TierGroup } from '@/data/cards'
import CardLogo from './CardLogo.vue'

withDefaults(
  defineProps<{
    groups?: TierGroup[]
  }>(),
  {
    groups: () => tierGroups
  }
)
</script>

<template>
  <section class="tier-list" aria-label="卡片分层排行榜">
    <article v-for="group in groups" :key="group.id" class="tier-row">
      <div class="tier-label" :class="group.color">{{ group.label }}</div>
      <div class="tier-panel">
        <RouterLink
          v-for="item in group.items"
          :key="item.id"
          class="tier-card"
          :to="item.cardId ? `/card/${item.cardId}` : '/ranking'"
          :aria-label="`查看 ${item.name} 详情`"
        >
          <CardLogo :logo="item.logo" :text="item.logoText" size="lg" />
          <span>{{ item.name }}</span>
        </RouterLink>
      </div>
    </article>
  </section>
</template>
