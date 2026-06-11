<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCardStore } from '@/composables/useCardStore'
import WalletCard from './WalletCard.vue'

const router = useRouter()
const { myWalletCards } = useCardStore()
</script>

<template>
  <section class="wallet-stack" aria-label="我的卡片堆叠">
    <div v-if="!myWalletCards.length" class="empty-state">
      <strong>还没有卡片</strong>
      <span>去市场或添加页选择第一张卡片</span>
    </div>
    <button
      v-for="(card, index) in myWalletCards"
      :key="card.id"
      type="button"
      class="wallet-stack-item"
      :style="{ zIndex: String(index + 1), '--stack-index': String(index) }"
      @click="router.push(`/card/${card.id}`)"
    >
      <WalletCard :card="card" />
    </button>
  </section>
</template>
