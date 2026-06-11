<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <svg class="icon-symbol" viewBox="0 0 24 24" aria-hidden="true">
    <template v-if="name === 'home'">
      <path d="M4 11.2 12 4l8 7.2v8a1.6 1.6 0 0 1-1.6 1.6h-4.1v-5.7H9.7v5.7H5.6A1.6 1.6 0 0 1 4 19.2z" />
    </template>
    <template v-else-if="name === 'market'">
      <path d="M5.2 10.2h13.6l-1-4.6H6.2z" />
      <path d="M6.2 10.2v8.4a1.5 1.5 0 0 0 1.5 1.5h8.6a1.5 1.5 0 0 0 1.5-1.5v-8.4" />
      <path d="M9 20.1v-5.2h6v5.2M5.2 10.2c.2 1.4 1.2 2.3 2.5 2.3s2.2-.9 2.4-2.3c.2 1.4 1.2 2.3 2.5 2.3s2.2-.9 2.4-2.3c.2 1.4 1.2 2.3 2.5 2.3s2.1-.9 2.3-2.3" />
    </template>
    <template v-else-if="name === 'rank'">
      <path d="M8.2 4.8h7.6v2.4a3.8 3.8 0 0 1-7.6 0z" />
      <path d="M8.2 6.2H5.4v1.3a3 3 0 0 0 3.3 3M15.8 6.2h2.8v1.3a3 3 0 0 1-3.3 3" />
      <path d="M12 11v3.2M9.2 19.4h5.6M10.2 14.2h3.6l.7 5.2h-5z" />
    </template>
    <template v-else-if="name === 'trend'">
      <path d="M4.5 18.6h15" />
      <path d="m5.4 14.7 4.1-4.2 3 2.8 5.9-6.4" />
      <circle cx="5.4" cy="14.7" r="1.2" />
      <circle cx="9.5" cy="10.5" r="1.2" />
      <circle cx="12.5" cy="13.3" r="1.2" />
      <circle cx="18.4" cy="6.9" r="1.2" />
    </template>
    <template v-else-if="name === 'discover'">
      <circle cx="12" cy="12" r="7.8" />
      <path d="m14.8 8.4-1.5 5-5 1.5 1.5-5z" />
      <path d="M12 4.2v1.4M12 18.4v1.4M4.2 12h1.4M18.4 12h1.4" />
    </template>
    <template v-else-if="name === 'profile'">
      <path d="M12 12.2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.8 20.4c.7-3.7 3.2-5.7 7.2-5.7s6.5 2 7.2 5.7" />
    </template>
    <template v-else-if="name === 'bell'">
      <path d="M7.2 10.1a4.8 4.8 0 0 1 9.6 0v3.2l1.4 2H5.8l1.4-2z" />
      <path d="M10 17.4a2 2 0 0 0 4 0" />
      <path class="icon-fill-accent" d="M15.8 14.5h2.4l-1.4-1.9v-2.3a4.8 4.8 0 0 0-.8-2.7c-1 .7-1.5 1.8-1.5 3.4v2.3z" />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="10.6" cy="10.6" r="5.6" />
      <path d="m15 15 4.1 4.1" />
    </template>
    <template v-else-if="name === 'back'">
      <path d="m14.8 5.2-6.6 6.6 6.6 6.8" />
    </template>
    <template v-else-if="name === 'more'">
      <circle cx="6.6" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="17.4" cy="12" r="1.2" />
    </template>
    <template v-else-if="name === 'card'">
      <rect x="4" y="6.8" width="16" height="10.4" rx="2" />
      <path d="M4 10h16M7.2 14.2h3.6" />
    </template>
    <template v-else-if="name === 'crypto-card'">
      <rect x="3.8" y="6.4" width="16.4" height="11.2" rx="2.4" />
      <circle cx="8.4" cy="12" r="2.45" />
      <path d="M8.4 10.4v2.1a1.35 1.35 0 0 0 2.7 0v-2.1M13.8 10h3.1M13.8 13.8h2.3" />
    </template>
    <template v-else-if="name === 'credit-card'">
      <rect x="3.8" y="6.4" width="16.4" height="11.2" rx="2.4" />
      <path d="M3.8 10h16.4M7.1 14.2h4.4M15.2 14.3l1.1 1.1 2-2.4" />
      <path d="M16.9 4.1v2M19 5.1h-4.2" />
    </template>
    <template v-else-if="name === 'debit-card'">
      <rect x="3.8" y="6.4" width="16.4" height="11.2" rx="2.4" />
      <rect x="6.6" y="10.4" width="4.2" height="3.5" rx="0.9" />
      <path d="M6.6 12.2h4.2M8.7 10.4v3.5M13.8 10.6h3.4M13.8 13.6h2.2" />
    </template>
    <template v-else-if="name === 'bank-account'">
      <path d="M4.4 9.3 12 4.8l7.6 4.5" />
      <path d="M5.5 19.2h13M6.8 9.8h10.4M7.6 17.2V10.4M11 17.2V10.4M14.4 17.2V10.4M17.8 17.2V10.4" />
      <path d="M6.4 17.2h11.2" />
    </template>
    <template v-else-if="name === 'wallet'">
      <path d="M5 7.2h12.8A2.2 2.2 0 0 1 20 9.4v8.2a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 17.6V6.7A2.2 2.2 0 0 1 5.2 4.5h10.2" />
      <path d="M15.6 12.1h4.1v3.7h-4.1a1.9 1.9 0 0 1 0-3.7Z" />
    </template>
    <template v-else-if="name === 'service'">
      <path d="M7 10a5 5 0 0 1 10 0v1.1a2.2 2.2 0 0 1 1.5 2.1v1.9a2.2 2.2 0 0 1-2.2 2.2H15V10.7h1.4V10a4.4 4.4 0 0 0-8.8 0v.7H9v6.6H7.7a2.2 2.2 0 0 1-2.2-2.2v-1.9A2.2 2.2 0 0 1 7 11.1z" />
      <path d="M13.5 19h-3" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 3.8 19 6.5v5.8c0 4.2-2.4 7-7 8-4.6-1-7-3.8-7-8V6.5z" />
      <path d="m8.8 12 2.1 2.1 4.3-4.7" />
    </template>
    <template v-else-if="name === 'star-line'">
      <path d="m12 4.2 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L7.5 18l.9-5-3.6-3.5 5-.7z" />
    </template>
    <template v-else-if="name === 'history'">
      <path d="M5.2 8.5A7.6 7.6 0 1 1 4.9 15" />
      <path d="M5 5v4h4M12 8.6v4.3l3 1.8" />
    </template>
    <template v-else-if="name === 'settings'">
      <path d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z" />
      <path d="M19.4 13.5v-3l-2.1-.5a7.2 7.2 0 0 0-.8-1.8l1.1-1.9-2.1-2.1-1.9 1.1a7.2 7.2 0 0 0-1.8-.8L11.3 2H8.7l-.5 2.1a7.2 7.2 0 0 0-1.8.8L4.5 3.8 2.4 5.9l1.1 1.9a7.2 7.2 0 0 0-.8 1.8l-2.1.5v3l2.1.5c.2.6.5 1.2.8 1.8l-1.1 1.9 2.1 2.1 1.9-1.1c.6.3 1.2.6 1.8.8l.5 2.1h2.6l.5-2.1c.6-.2 1.2-.5 1.8-.8l1.9 1.1 2.1-2.1-1.1-1.9c.3-.6.6-1.2.8-1.8z" transform="translate(2)" />
    </template>
    <template v-else-if="name === 'help'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.8 9.5a2.4 2.4 0 0 1 4.6.8c0 2-2.4 2.1-2.4 4M12 17.2v.1" />
    </template>
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 10.5v5M12 7.4v.1" />
    </template>
    <template v-else-if="name === 'logout'">
      <path d="M10.2 5H6.7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.5" />
      <path d="M13.2 8.2 17 12l-3.8 3.8M8.8 12H17" />
    </template>
    <template v-else-if="name === 'chevron'">
      <path d="m9.5 5.8 5.8 6.2-5.8 6.2" />
    </template>
    <template v-else-if="name === 'plane'">
      <path d="M4 12.4 20 4.8l-4.6 14.5-3.7-5.8-5.1-1.1Z" />
      <path d="m11.7 13.5 3.1-3.6" />
    </template>
    <template v-else-if="name === 'spotify'">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M7.8 10.2c3.2-1 6-.7 8.4.6M8.4 13c2.5-.7 4.7-.5 6.7.5M9.2 15.4c1.8-.4 3.4-.3 4.9.4" />
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="4.5" y="4.5" width="5" height="5" rx="1" />
      <rect x="14.5" y="4.5" width="5" height="5" rx="1" />
      <rect x="4.5" y="14.5" width="5" height="5" rx="1" />
      <rect x="14.5" y="14.5" width="5" height="5" rx="1" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="8" />
    </template>
  </svg>
</template>
