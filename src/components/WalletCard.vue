<script setup lang="ts">
import { computed } from 'vue'
import type { WalletCardItem } from '@/data/cards'
import { getCardVisual } from '@/data/cardVisuals'
import CardLogo from './CardLogo.vue'

const props = defineProps<{
  card: WalletCardItem
  large?: boolean
}>()

const visual = computed(() => getCardVisual(props.card.id))
const detailStyle = computed(() =>
  props.large && visual.value
    ? {
        '--detail-card-bg': visual.value.detail.background,
        '--detail-card-glow': visual.value.detail.glow,
        '--detail-card-accent': visual.value.detail.accent,
        '--detail-card-text': visual.value.detail.text
      }
    : undefined
)
const detailPatternClass = computed(() =>
  props.large && visual.value ? `wallet-pattern-${visual.value.detail.pattern}` : ''
)
</script>

<template>
  <article
    class="wallet-card"
    :class="[card.variant, detailPatternClass, { 'wallet-card-large': large, 'wallet-card-reference': large && visual }]"
    :style="detailStyle"
  >
    <div class="wallet-card-shine" />
    <div class="wallet-card-top">
      <div class="wallet-brand">
        <CardLogo :logo="card.logo" :text="card.logoText" :src="visual?.logoSrc" size="sm" />
        <strong>{{ card.name }}</strong>
      </div>
      <span class="wallet-label">{{ card.label }}</span>
    </div>
    <div class="wallet-card-bottom">
      <span v-if="large" class="masked-number">**** 2345</span>
      <span v-else class="wallet-ghost">{{ card.network === 'wave' ? ')))' : '' }}</span>
      <strong v-if="card.network && card.network !== 'wave'" class="wallet-network">{{ card.network }}</strong>
      <span v-else-if="large && visual" class="wallet-source-label">{{ visual.detail.sourceName }}</span>
    </div>
  </article>
</template>
