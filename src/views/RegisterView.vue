<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import { useAuthStore } from '@/composables/useAuthStore'

const router = useRouter()
const route = useRoute()
const { loading, register } = useAuthStore()

const form = reactive({
  username: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  remember: true
})
const error = ref('')

const redirectTarget = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/cards'
})
const loginQuery = computed(() => ({ redirect: redirectTarget.value }))

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : '注册失败，请稍后重试'
}

async function handleSubmit() {
  error.value = ''

  if (!form.username.trim() || !form.password) {
    error.value = '请输入用户名和密码'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }

  try {
    await register({
      username: form.username,
      displayName: form.displayName,
      email: form.email,
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
      <button class="round-button icon-button" type="button" aria-label="返回登录" @click="router.push('/login')">
        <IconSymbol name="back" />
      </button>
      <div class="auth-mark">Card</div>
      <h1>创建账号</h1>
      <p>保存您的卡片组合，跨页面同步收藏和浏览记录</p>
    </section>

    <form class="auth-panel" @submit.prevent="handleSubmit">
      <label class="form-field">
        <span>用户名</span>
        <input v-model.trim="form.username" type="text" autocomplete="username" placeholder="3-18 位字母或数字" />
      </label>

      <label class="form-field">
        <span>昵称</span>
        <input v-model.trim="form.displayName" type="text" autocomplete="nickname" placeholder="选填" />
      </label>

      <label class="form-field">
        <span>邮箱</span>
        <input v-model.trim="form.email" type="email" autocomplete="email" placeholder="选填" />
      </label>

      <label class="form-field">
        <span>密码</span>
        <input v-model="form.password" type="password" autocomplete="new-password" placeholder="至少 6 位" />
      </label>

      <label class="form-field">
        <span>确认密码</span>
        <input v-model="form.confirmPassword" type="password" autocomplete="new-password" placeholder="再次输入密码" />
      </label>

      <div class="auth-options">
        <label class="auth-check">
          <input v-model="form.remember" type="checkbox" />
          <span>保持登录</span>
        </label>
        <RouterLink :to="{ path: '/login', query: loginQuery }">已有账号</RouterLink>
      </div>

      <p v-if="error" class="form-error">{{ error }}</p>

      <button class="auth-submit" type="submit" :disabled="loading">
        {{ loading ? '注册中...' : '注册并登录' }}
      </button>
    </form>
  </main>
</template>
