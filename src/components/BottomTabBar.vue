<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconSymbol from './IconSymbol.vue'

const route = useRoute()

const tabs = [
  { path: '/cards', icon: 'home', label: '我的卡片' },
  { path: '/market', icon: 'discover', label: '市场' },
  { path: '/add', icon: 'plus', label: '添加卡片', center: true },
  { path: '/ranking', icon: 'trend', label: '排行榜' },
  { path: '/profile', icon: 'profile', label: '我的' }
]

const activePath = computed(() => route.path)
</script>

<template>
  <nav class="bottom-tabbar" aria-label="底部导航">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="tabbar-item"
      :class="{ active: activePath === tab.path, 'tabbar-add': tab.center }"
      :aria-label="tab.label"
    >
      <span v-if="tab.center" class="add-orb">+</span>
      <IconSymbol v-else :name="tab.icon" />
    </RouterLink>
  </nav>
</template>
