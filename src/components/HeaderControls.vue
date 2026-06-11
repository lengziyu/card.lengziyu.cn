<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconSymbol from './IconSymbol.vue'
import { useAuthStore } from '@/composables/useAuthStore'

withDefaults(
  defineProps<{
    showBell?: boolean
  }>(),
  {
    showBell: true
  }
)

const router = useRouter()
const { avatarText } = useAuthStore()
</script>

<template>
  <div class="header-controls">
    <button class="round-button avatar-button" aria-label="个人头像" @click="router.push('/profile')">{{ avatarText }}</button>
    <button v-if="showBell" class="round-button icon-button" aria-label="通知">
      <IconSymbol name="bell" />
    </button>
  </div>
</template>
