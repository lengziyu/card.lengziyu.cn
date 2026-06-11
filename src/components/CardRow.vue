<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { CardListItem } from '@/data/cards'
import CardLogo from './CardLogo.vue'

const props = defineProps<{
  card: CardListItem
  mode?: 'detail' | 'add'
  added?: boolean
}>()

const emit = defineEmits<{
  add: [card: CardListItem]
}>()

const router = useRouter()

function openCard() {
  if (props.mode === 'add' && !props.added) {
    emit('add', props.card)
    return
  }

  router.push(`/card/${props.card.id}`)
}
</script>

<template>
  <button class="card-row" :class="{ featured: card.featured, added }" type="button" @click="openCard">
    <CardLogo :logo="card.logo" :text="card.logoText" />
    <span class="card-row-main">
      <strong>{{ card.name }}</strong>
      <em>{{ card.issuer }}</em>
    </span>
    <span class="card-row-suffix" :class="`suffix-${card.suffixType || 'text'}`">
      <span v-if="added && mode === 'add'" class="added-mark">已添加</span>
      <span v-else-if="card.suffixType === 'mc'" class="mc-mark" />
      <span v-else>{{ card.suffix }}</span>
    </span>
  </button>
</template>
