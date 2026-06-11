import { computed, ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'card-h5-theme-v1'

function readTheme(): ThemeMode {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const theme = ref<ThemeMode>(readTheme())

function applyTheme(nextTheme: ThemeMode) {
  document.documentElement.dataset.theme = nextTheme
  document.documentElement.style.colorScheme = nextTheme
}

applyTheme(theme.value)

export function useThemeStore() {
  const isDark = computed(() => theme.value === 'dark')
  const themeLabel = computed(() => (isDark.value ? '深色' : '浅色'))

  function setTheme(nextTheme: ThemeMode) {
    theme.value = nextTheme
    window.localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    theme,
    isDark,
    themeLabel,
    setTheme,
    toggleTheme
  }
}
