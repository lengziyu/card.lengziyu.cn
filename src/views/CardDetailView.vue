<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconSymbol from '@/components/IconSymbol.vue'
import WalletCard from '@/components/WalletCard.vue'
import { getListCardById, getWalletCardById } from '@/data/cards'
import { getCardVisual } from '@/data/cardVisuals'
import { getCardDetailSpec } from '@/data/cardDetails'
import { useAuthStore } from '@/composables/useAuthStore'
import { useCardStore } from '@/composables/useCardStore'

const router = useRouter()
const route = useRoute()
const toast = ref('')
const actionOpen = ref(false)
const detailLoading = ref(true)
let toastTimer: number | undefined
let detailTimer: number | undefined

const { isAuthenticated } = useAuthStore()
const { addCard, removeCard, isAdded, favoriteIds, recordRecent, toggleFavorite } = useCardStore()
const cardId = computed(() => String(route.params.id || 'plasma'))
const walletCard = computed(() => getWalletCardById(cardId.value) || getWalletCardById('plasma')!)
const listCard = computed(() => getListCardById(cardId.value))
const title = computed(() => listCard.value?.name || `${walletCard.value.name} Card`)
const issuer = computed(() => listCard.value?.issuer || walletCard.value.name)
const added = computed(() => isAuthenticated.value && isAdded(cardId.value))
const favorite = computed(() => isAuthenticated.value && favoriteIds.value.includes(cardId.value))
const cardVisual = computed(() => getCardVisual(cardId.value))
const cardDetail = computed(() => getCardDetailSpec(cardId.value))
const benefits = computed(() => cardDetail.value.benefits)
const fees = computed(() => cardDetail.value.fees)
const metaItems = computed(() => [
  { label: '地区', value: cardDetail.value.region },
  { label: '资金', value: cardDetail.value.funding },
  { label: '开通', value: cardDetail.value.speed }
])

watch(
  [cardId, isAuthenticated],
  ([id, authenticated]) => {
    if (authenticated) recordRecent(id)
  },
  { immediate: true }
)

watch(
  cardId,
  () => {
    detailLoading.value = true
    window.clearTimeout(detailTimer)
    detailTimer = window.setTimeout(() => {
      detailLoading.value = false
    }, 460)
  },
  { immediate: true }
)

onMounted(() => {
  window.clearTimeout(detailTimer)
  detailTimer = window.setTimeout(() => {
    detailLoading.value = false
  }, 460)
})

function showToast(message: string) {
  toast.value = message
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.value = ''
  }, 1800)
}

function requireLogin() {
  if (isAuthenticated.value) return false

  actionOpen.value = false
  router.push({
    path: '/login',
    query: { redirect: route.fullPath }
  })
  return true
}

function handleAdd() {
  if (requireLogin()) return

  if (added.value) {
    router.push('/cards')
    return
  }

  addCard(cardId.value)
  showToast(`已添加 ${title.value}`)
}

function handleFavorite() {
  if (requireLogin()) return

  toggleFavorite(cardId.value)
  showToast(favorite.value ? '已收藏' : '已取消收藏')
}

function handleRemove() {
  if (requireLogin()) return

  if (!added.value) {
    showToast(`${title.value} 暂未添加`)
    actionOpen.value = false
    return
  }

  removeCard(cardId.value)
  actionOpen.value = false
  showToast(`已从我的卡片移除 ${title.value}`)
}

function goMarket() {
  actionOpen.value = false
  router.push('/market')
}

function openOfficial() {
  actionOpen.value = false
  window.open(cardDetail.value.applyUrl, '_blank', 'noreferrer')
}

onBeforeUnmount(() => {
  window.clearTimeout(toastTimer)
  window.clearTimeout(detailTimer)
})
</script>

<template>
  <main class="page page-detail">
    <div class="detail-nav">
      <button class="round-button icon-button" aria-label="返回" @click="router.back()">
        <IconSymbol name="back" />
      </button>
      <button class="round-button icon-button" :class="{ active: actionOpen }" aria-label="更多操作" @click="actionOpen = true">
        <IconSymbol name="more" />
      </button>
    </div>

    <Transition name="detail-content" mode="out-in">
      <section v-if="detailLoading" class="detail-skeleton" aria-label="卡片详情加载中">
        <div class="skeleton-panel detail-skeleton-card" />
        <div class="skeleton-line skeleton-title" />
        <div class="skeleton-line skeleton-copy" />
        <div class="skeleton-grid detail-skeleton-meta">
          <div class="skeleton-panel" />
          <div class="skeleton-panel" />
          <div class="skeleton-panel" />
        </div>
        <div class="skeleton-panel skeleton-wide" />
        <div class="skeleton-grid benefit-skeleton-grid">
          <div class="skeleton-panel" />
          <div class="skeleton-panel" />
          <div class="skeleton-panel" />
          <div class="skeleton-panel" />
        </div>
      </section>

      <div v-else :key="cardId" class="detail-content-ready">
        <WalletCard :card="walletCard" large />

        <section class="detail-title">
          <h1>{{ title }}</h1>
          <p>{{ issuer }}</p>
          <div class="rating-line">
            <span class="star">★</span>
            <strong>{{ cardDetail.rating.toFixed(1) }}</strong>
            <span>({{ cardDetail.reviews }})</span>
          </div>
          <div class="tag-row">
            <span v-for="tag in cardDetail.tags" :key="tag">{{ tag }}</span>
          </div>
        </section>

        <section class="detail-meta-grid" aria-label="卡片基础信息">
          <div v-for="item in metaItems" :key="item.label">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </section>

        <section v-if="cardVisual" class="detail-reference">
          <div>
            <span>卡面参考</span>
            <strong>{{ cardVisual.detail.material }}</strong>
          </div>
          <a :href="cardVisual.detail.sourceUrl" target="_blank" rel="noreferrer">
            {{ cardVisual.detail.sourceName }}
          </a>
        </section>

        <a class="official-action" :href="cardDetail.applyUrl" target="_blank" rel="noreferrer">
          <span>查看官网 / 申请入口</span>
          <IconSymbol name="chevron" />
        </a>

        <section class="detail-block">
          <h2>核心权益</h2>
          <div class="benefit-grid">
            <div v-for="item in benefits" :key="item.text" class="benefit-item">
              <IconSymbol :name="item.icon" />
              <span>{{ item.text }}</span>
            </div>
          </div>
        </section>

        <section class="detail-block fee-block">
          <h2>费用</h2>
          <dl>
            <div v-for="item in fees" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
          <p class="detail-note">{{ cardDetail.note }}</p>
        </section>
      </div>
    </Transition>

    <button v-if="!detailLoading" class="primary-action" :class="{ done: added }" type="button" @click="handleAdd">
      {{ added ? '已在我的卡片中' : '添加到我的卡片' }}
    </button>

    <Transition name="toast-fade">
      <div v-if="toast" class="toast-message">{{ toast }}</div>
    </Transition>

    <Transition name="sheet-fade">
      <div v-if="actionOpen" class="action-backdrop" @click.self="actionOpen = false">
        <section class="action-sheet" aria-label="卡片操作">
          <div class="action-sheet-head">
            <strong>{{ title }}</strong>
            <button type="button" aria-label="关闭" @click="actionOpen = false">×</button>
          </div>
          <button class="action-sheet-item" type="button" @click="handleFavorite">
            <IconSymbol name="star-line" />
            <span>{{ favorite ? '取消收藏' : '收藏卡片' }}</span>
          </button>
          <button class="action-sheet-item" type="button" @click="goMarket">
            <IconSymbol name="market" />
            <span>查看同类卡片</span>
          </button>
          <button class="action-sheet-item" type="button" @click="openOfficial">
            <IconSymbol name="info" />
            <span>打开官网 / 申请入口</span>
          </button>
          <button class="action-sheet-item danger" type="button" :disabled="!added" @click="handleRemove">
            <IconSymbol name="logout" />
            <span>{{ added ? '从我的卡片移除' : '尚未添加到我的卡片' }}</span>
          </button>
        </section>
      </div>
    </Transition>
  </main>
</template>
