import { computed, ref } from 'vue'
import * as authApi from '@/api/auth'
import { setCardStateOwner } from '@/composables/useCardStore'

const session = ref<authApi.AuthSession | null>(authApi.readCachedSession())
const loading = ref(false)

setCardStateOwner(session.value?.user.id ?? null)

function applySession(nextSession: authApi.AuthSession | null) {
  session.value = nextSession
  setCardStateOwner(nextSession?.user.id ?? null)
}

export function useAuthStore() {
  const user = computed(() => session.value?.user ?? null)
  const isAuthenticated = computed(() => Boolean(session.value?.user))
  const avatarText = computed(() => {
    const source = user.value?.displayName || user.value?.username || 'B'
    return source.slice(0, 1).toUpperCase()
  })

  async function refreshSession() {
    loading.value = true
    try {
      applySession(await authApi.getSession())
    } finally {
      loading.value = false
    }
  }

  async function login(payload: authApi.LoginPayload) {
    loading.value = true
    try {
      const nextSession = await authApi.login(payload)
      applySession(nextSession)
      return nextSession
    } finally {
      loading.value = false
    }
  }

  async function register(payload: authApi.RegisterPayload) {
    loading.value = true
    try {
      const nextSession = await authApi.register(payload)
      applySession(nextSession)
      return nextSession
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await authApi.logout()
      applySession(null)
    } finally {
      loading.value = false
    }
  }

  return {
    session,
    user,
    isAuthenticated,
    avatarText,
    loading,
    refreshSession,
    login,
    register,
    logout
  }
}
