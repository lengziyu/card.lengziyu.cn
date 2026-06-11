<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import WalletStack from '@/components/WalletStack.vue'
import { useAuthStore } from '@/composables/useAuthStore'
import { useCardStore } from '@/composables/useCardStore'

const { isAuthenticated } = useAuthStore()
const { myCardIds } = useCardStore()
</script>

<template>
  <main class="page page-home">
    <PageTitle
      title="我的卡片"
      :subtitle="isAuthenticated ? `管理您的 ${myCardIds.length} 张卡片与权益` : '当前未登录，正在浏览示例卡片'"
      show-add
    />
    <section v-if="!isAuthenticated" class="auth-inline-state">
      <div>
        <strong>当前未登录</strong>
        <span>登录后可保存你的卡片、收藏和浏览记录</span>
      </div>
      <RouterLink to="/login?redirect=/cards">去登录</RouterLink>
    </section>
    <WalletStack />
  </main>
</template>
