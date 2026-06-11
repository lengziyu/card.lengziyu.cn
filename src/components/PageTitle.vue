<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  subtitle?: string
  showAdd?: boolean
}>()

const router = useRouter()
</script>

<template>
  <section class="page-title-row">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    <button v-if="showAdd" class="round-button title-add-button" aria-label="添加卡片" @click="router.push('/add')">
      +
    </button>
  </section>
</template>
