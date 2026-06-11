import { computed, ref } from 'vue'
import { getWalletCardById } from '@/data/cards'

const STORAGE_PREFIX = 'card-h5-state-v1'

type PersistedState = {
  myCardIds: string[]
  favoriteIds: string[]
  recentIds: string[]
}

const defaultState: PersistedState = {
  myCardIds: ['apple-cash', 'n26', 'boc', 'hsbc', 'welab', 'bybit', 'plasma', 'safepal'],
  favoriteIds: ['plasma', 'safepal'],
  recentIds: ['plasma', 'bybit', 'welab']
}

let activeOwnerId = 'guest'

function getStorageKey(ownerId = activeOwnerId) {
  return `${STORAGE_PREFIX}:${ownerId}`
}

function getDefaultState(): PersistedState {
  return {
    myCardIds: [...defaultState.myCardIds],
    favoriteIds: [...defaultState.favoriteIds],
    recentIds: [...defaultState.recentIds]
  }
}

function readState(ownerId = activeOwnerId): PersistedState {
  try {
    const raw = window.localStorage.getItem(getStorageKey(ownerId))
    if (!raw) return getDefaultState()
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    const fallback = getDefaultState()
    return {
      myCardIds: Array.isArray(parsed.myCardIds) ? parsed.myCardIds : fallback.myCardIds,
      favoriteIds: Array.isArray(parsed.favoriteIds) ? parsed.favoriteIds : fallback.favoriteIds,
      recentIds: Array.isArray(parsed.recentIds) ? parsed.recentIds : fallback.recentIds
    }
  } catch {
    return getDefaultState()
  }
}

const state = ref<PersistedState>(readState())

function persist() {
  window.localStorage.setItem(getStorageKey(), JSON.stringify(state.value))
}

export function setCardStateOwner(ownerId: string | null) {
  const nextOwnerId = ownerId || 'guest'
  if (nextOwnerId === activeOwnerId) return

  activeOwnerId = nextOwnerId
  state.value = readState()
}

export function useCardStore() {
  const myCardIds = computed(() => state.value.myCardIds)
  const favoriteIds = computed(() => state.value.favoriteIds)
  const recentIds = computed(() => state.value.recentIds)

  const myWalletCards = computed(() =>
    state.value.myCardIds
      .map((id) => getWalletCardById(id))
      .filter((card): card is NonNullable<ReturnType<typeof getWalletCardById>> => Boolean(card))
  )

  function isAdded(id: string) {
    return state.value.myCardIds.includes(id)
  }

  function addCard(id: string) {
    if (isAdded(id)) return false
    state.value = {
      ...state.value,
      myCardIds: [...state.value.myCardIds, id]
    }
    persist()
    return true
  }

  function removeCard(id: string) {
    state.value = {
      ...state.value,
      myCardIds: state.value.myCardIds.filter((cardId) => cardId !== id)
    }
    persist()
  }

  function recordRecent(id: string) {
    state.value = {
      ...state.value,
      recentIds: [id, ...state.value.recentIds.filter((cardId) => cardId !== id)].slice(0, 8)
    }
    persist()
  }

  function toggleFavorite(id: string) {
    const exists = state.value.favoriteIds.includes(id)
    state.value = {
      ...state.value,
      favoriteIds: exists
        ? state.value.favoriteIds.filter((cardId) => cardId !== id)
        : [...state.value.favoriteIds, id]
    }
    persist()
  }

  return {
    myCardIds,
    favoriteIds,
    recentIds,
    myWalletCards,
    isAdded,
    addCard,
    removeCard,
    recordRecent,
    toggleFavorite
  }
}
