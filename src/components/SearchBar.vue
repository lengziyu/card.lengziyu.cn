<script setup lang="ts">
import IconSymbol from './IconSymbol.vue'

defineProps<{
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="search-bar">
    <IconSymbol name="search" />
    <input
      type="search"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
  </label>
</template>
