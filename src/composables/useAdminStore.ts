import { computed, ref } from 'vue'
import * as adminApi from '@/api/admin'

const session = ref<adminApi.AdminSession | null>(adminApi.readCachedAdminSession())
const loading = ref(false)

function applySession(nextSession: adminApi.AdminSession | null) {
  session.value = nextSession
}

export function useAdminStore() {
  const admin = computed(() => session.value)
  const isAdminAuthenticated = computed(() => Boolean(session.value))

  async function refreshAdminSession() {
    loading.value = true
    try {
      applySession(await adminApi.getAdminSession())
    } finally {
      loading.value = false
    }
  }

  async function loginAdmin(payload: adminApi.AdminLoginPayload) {
    loading.value = true
    try {
      const nextSession = await adminApi.loginAdmin(payload)
      applySession(nextSession)
      return nextSession
    } finally {
      loading.value = false
    }
  }

  async function logoutAdmin() {
    loading.value = true
    try {
      await adminApi.logoutAdmin()
      applySession(null)
    } finally {
      loading.value = false
    }
  }

  return {
    admin,
    isAdminAuthenticated,
    loading,
    refreshAdminSession,
    loginAdmin,
    logoutAdmin
  }
}
