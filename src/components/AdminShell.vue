<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import { useAdminStore } from '@/composables/useAdminStore'

defineProps<{
  title: string
  subtitle: string
}>()

const router = useRouter()
const { admin, logoutAdmin } = useAdminStore()

const navItems = [
  { label: '卡片数据', to: '/admin/cards', icon: 'card' },
  { label: '爬取草稿', to: '/admin/drafts', icon: 'search' }
]

async function handleLogout() {
  await logoutAdmin()
  router.replace('/admin/login')
}
</script>

<template>
  <main class="admin-page">
    <aside class="admin-sidebar">
      <RouterLink class="admin-brand" to="/admin/cards">
        <span>Card</span>
        <strong>数据台</strong>
      </RouterLink>
      <nav class="admin-nav" aria-label="管理端导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          <IconSymbol :name="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
      <div class="admin-account">
        <span>{{ admin?.name || '管理员' }}</span>
        <button type="button" @click="handleLogout">
          <IconSymbol name="logout" />
          退出
        </button>
      </div>
    </aside>

    <section class="admin-main">
      <header class="admin-header">
        <div>
          <h1>{{ title }}</h1>
          <p>{{ subtitle }}</p>
        </div>
        <div class="admin-header-actions">
          <slot name="actions" />
        </div>
      </header>

      <slot />
    </section>
  </main>
</template>
