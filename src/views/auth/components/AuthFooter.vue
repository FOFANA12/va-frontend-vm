<template>
  <div class="text-sm text-center text-gray-400 mt-4">
    © {{ year }} {{ appName }} • Propulsé par {{ poweredBy }}
  </div>
</template>
  
  <script setup>
const year = new Date().getFullYear();
const appName = import.meta.env.VITE_APP_NAME || 'VA';
const poweredBy = import.meta.env.VITE_POWERED_BY || 'LTS';
</script>
  