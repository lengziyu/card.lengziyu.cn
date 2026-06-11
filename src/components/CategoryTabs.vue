<script setup lang="ts">
import type { Category } from '@/data/cards'
import IconSymbol from './IconSymbol.vue'

defineProps<{
  categories: Category[]
  modelValue: Category
  variant?: 'pill' | 'icons'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Category]
}>()

const categoryIcons: Record<Category, string> = {
  U卡: 'crypto-card',
  信用卡: 'credit-card',
  借记卡: 'debit-card',
  银行账户: 'bank-account'
}
</script>

<template>
  <div class="category-tabs" :class="variant === 'icons' ? 'category-icons' : 'category-pills'">
    <button
      v-for="item in categories"
      :key="item"
      type="button"
      :class="{ active: item === modelValue }"
      @click="emit('update:modelValue', item)"
    >
      <span v-if="variant === 'icons'" class="category-icon-dot">
        <IconSymbol :name="categoryIcons[item]" />
      </span>
      <span>{{ item }}</span>
    </button>
  </div>
</template>
