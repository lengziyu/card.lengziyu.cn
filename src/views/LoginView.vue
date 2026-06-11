<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import { useAuthStore } from '@/composables/useAuthStore'

const router = useRouter()
const route = useRoute()
const { loading, login } = useAuthStore()

const form = reactive({
  account: '',
  password: '',
  remember: true
})
const error = ref('')

const redirectTarget = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/cards'
})
const registerQuery = computed(() => ({ redirect: redirectTarget.value }))

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : '登录失败，请稍后重试'
}

async function handleSubmit() {
  error.value = ''

  if (!form.account.trim() || !form.password) {
    error.value = '请输入账号和密码'
    return
  }

  try {
    await login({
      account: form.account,
      password: form.password,
      remember: form.remember
    })
    router.replace(redirectTarget.value)
  } catch (err) {
    error.value = getErrorMessage(err)
  }
}
</script>

<template>
  <main class="page page-auth">
    <section class="auth-hero">
      <button class="round-button icon-button" type="button" aria-label="返回市场" @click="router.push('/market')">
        <IconSymbol name="back" />
      </button>
      <div class="auth-mark">Card</div>
      <h1>欢迎回来</h1>
      <p>登录后继续管理您的卡片、收藏与浏览记录</p>
    </section>

    <form class="auth-panel" @submit.prevent="handleSubmit">
      <label class="form-field">
        <span>账号或邮箱</span>
        <input v-model.trim="form.account" type="text" autocomplete="username" placeholder="buding" />
      </label>

      <label class="form-field">
        <span>密码</span>
        <input v-model="form.password" type="password" autocomplete="current-password" placeholder="至少 6 位" />
      </label>

      <div class="auth-options">
        <label class="auth-check">
          <input v-model="form.remember" type="checkbox" />
          <span>保持登录</span>
        </label>
        <RouterLink :to="{ path: '/register', query: registerQuery }">创建账号</RouterLink>
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>

      <button class="auth-submit" type="submit" :disabled="loading">
        {{ loading ? '登录中...' : '登录' }}
      </button>
    </form>
  </main>
</template>
