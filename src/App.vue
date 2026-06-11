<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomTabBar from './components/BottomTabBar.vue'
import { useThemeStore } from './composables/useThemeStore'

const route = useRoute()
const showTabbar = computed(() => !route.meta.hideTabbar)
const shellClass = computed(() => ['mobile-shell', { 'admin-shell-width': route.meta.adminShell }])
useThemeStore()
</script>

<template>
  <div class="app-background">
    <div :class="shellClass">
      <RouterView v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
      <BottomTabBar v-if="showTabbar" />
    </div>
  </div>
</template>
