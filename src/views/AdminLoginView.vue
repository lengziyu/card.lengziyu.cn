<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import { useAdminStore } from '@/composables/useAdminStore'

const router = useRouter()
const route = useRoute()
const { loginAdmin, loading } = useAdminStore()
const error = ref('')

const form = reactive({
  account: 'admin',
  password: 'admin123',
  remember: true
})

async function handleSubmit() {
  error.value = ''
  try {
    await loginAdmin(form)
    const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/admin')
      ? route.query.redirect
      : '/admin/cards'
    router.replace(redirect)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '登录失败'
  }
}
</script>

<template>
  <main class="admin-login-page">
    <RouterLink class="round-button icon-button admin-login-back" to="/cards" aria-label="返回前台">
      <IconSymbol name="back" />
    </RouterLink>

    <section class="admin-login-hero">
      <div class="auth-mark">Card</div>
      <h1>数据管理端</h1>
      <p>维护卡片资料、爬取草稿、发布状态和卡面来源。</p>
    </section>

    <form class="auth-panel admin-login-panel" @submit.prevent="handleSubmit">
      <label class="form-field">
        <span>管理员账号</span>
        <input v-model="form.account" autocomplete="username" placeholder="admin" />
      </label>
      <label class="form-field">
        <span>密码</span>
        <input v-model="form.password" type="password" autocomplete="current-password" placeholder="admin123" />
      </label>
      <label class="auth-check">
        <input v-model="form.remember" type="checkbox" />
        <span>保持登录</span>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button class="auth-submit" type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '进入管理端' }}
      </button>
    </form>
  </main>
</template>
