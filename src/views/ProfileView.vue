<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import { profileMenus } from '@/data/cards'
import { useAuthStore } from '@/composables/useAuthStore'
import { useCardStore } from '@/composables/useCardStore'
import { useThemeStore, type ThemeMode } from '@/composables/useThemeStore'

const router = useRouter()
const { user, avatarText, isAuthenticated, logout } = useAuthStore()
const { myCardIds, favoriteIds, recentIds } = useCardStore()
const { theme, setTheme } = useThemeStore()
const toast = ref('')
let toastTimer: number | undefined

const displayName = computed(() => user.value?.displayName || '未登录用户')
const username = computed(() => (user.value ? `@${user.value.username}` : '当前未登录'))
const accountLine = computed(() => user.value?.email || '登录后管理你的账户、卡片与收藏')
const membershipTitle = computed(() => `${user.value?.membership || 'Basic'} 会员`)
const membershipText = computed(() =>
  user.value?.membership === 'Platinum' ? '享受 4x 返现，优先兑换每单权益' : '添加更多卡片，解锁更高等级权益'
)
const menuGroups = computed(() => [
  profileMenus.slice(0, 5),
  profileMenus.slice(5, 8),
  isAuthenticated.value ? profileMenus.slice(8) : [{ label: '去登录', icon: 'profile' }]
])
const themeOptions: Array<{ label: string; value: ThemeMode }> = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' }
]

function badgeFor(label: string) {
  if (!isAuthenticated.value) return ''
  if (label === '我的卡片') return String(myCardIds.value.length)
  if (label === '我的收藏') return String(favoriteIds.value.length)
  if (label === '浏览记录') return String(recentIds.value.length)
  if (label === '帮助中心') return '1'
  return ''
}

function showToast(message: string) {
  toast.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

onBeforeUnmount(() => {
  window.clearTimeout(toastTimer)
})

async function handleLogout() {
  await logout()
  showToast('已退出登录')
}

async function handleMenu(label: string) {
  if (label === '去登录') {
    router.push('/login?redirect=/profile')
    return
  }
  if (!isAuthenticated.value && ['我的卡片', '我的收藏', '浏览记录', '设置'].includes(label)) {
    showToast('当前未登录，请先登录')
    return
  }
  if (label === '我的卡片') {
    router.push('/cards')
    return
  }
  if (label === '我的收藏') {
    if (favoriteIds.value[0]) {
      router.push(`/card/${favoriteIds.value[0]}`)
      return
    }
    showToast('还没有收藏卡片')
    return
  }
  if (label === '浏览记录') {
    if (recentIds.value[0]) {
      router.push(`/card/${recentIds.value[0]}`)
      return
    }
    showToast('暂无浏览记录')
    return
  }
  if (label === '卡片权益') {
    router.push('/ranking')
    return
  }
  if (label === '退出登录') {
    await handleLogout()
    return
  }
  showToast(`${label} 功能准备中`)
}
</script>

<template>
  <main class="page page-profile">
    <section class="profile-identity">
      <div class="profile-avatar">{{ avatarText }}</div>
      <div>
        <h1>{{ displayName }}</h1>
        <p>{{ username }} · {{ accountLine }}</p>
      </div>
    </section>

    <section class="membership-card">
      <div>
        <strong>{{ isAuthenticated ? membershipTitle : '当前未登录' }}</strong>
        <p>{{ isAuthenticated ? membershipText : '登录后可同步个人卡片、收藏和浏览记录' }}</p>
      </div>
      <button type="button" @click="isAuthenticated ? showToast('会员升级功能准备中') : router.push('/login?redirect=/profile')">
        {{ isAuthenticated ? '去升级' : '去登录' }}
      </button>
    </section>

    <section class="theme-card" aria-label="外观主题">
      <div>
        <span>外观主题</span>
        <strong>{{ theme === 'dark' ? '深色模式' : '浅色模式' }}</strong>
      </div>
      <div class="theme-toggle" role="group" aria-label="切换主题">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          type="button"
          :class="{ active: theme === option.value }"
          @click="setTheme(option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </section>

    <section class="profile-menu" aria-label="账户菜单">
      <div v-for="(group, groupIndex) in menuGroups" :key="groupIndex" class="profile-menu-group">
        <button v-for="item in group" :key="item.label" class="profile-menu-item" type="button" @click="handleMenu(item.label)">
          <IconSymbol :name="item.icon" />
          <span>{{ item.label }}</span>
          <em v-if="badgeFor(item.label)">{{ badgeFor(item.label) }}</em>
          <IconSymbol name="chevron" />
        </button>
      </div>
    </section>

    <Transition name="toast-fade">
      <div v-if="toast" class="toast-message">{{ toast }}</div>
    </Transition>
  </main>
</template>
