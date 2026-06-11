<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getLogoSourceByClass } from '@/data/cardVisuals'

const props = withDefaults(
  defineProps<{
    logo: string
    text: string
    size?: 'sm' | 'md' | 'lg'
    src?: string
  }>(),
  {
    size: 'md'
  }
)

const failed = ref(false)
const logoSrc = computed(() => (failed.value ? '' : props.src || getLogoSourceByClass(props.logo)))

watch(
  () => [props.logo, props.src],
  () => {
    failed.value = false
  }
)

function handleError() {
  failed.value = true
}
</script>

<template>
  <span class="card-logo" :class="[logo, `logo-${size}`, { 'has-logo-image': logoSrc }]">
    <img v-if="logoSrc" :src="logoSrc" alt="" loading="lazy" @error="handleError" />
    <span class="card-logo-text">{{ text }}</span>
  </span>
</template>
