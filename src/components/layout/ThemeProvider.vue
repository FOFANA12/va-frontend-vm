<template>
  <slot />
</template>

<script setup>
import { ref, provide, onMounted, watch, computed } from 'vue'

const theme = ref('light')
const isInitialized = ref(false)

const isDarkMode = computed(() => theme.value === 'dark')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  theme.value = savedTheme || 'light'
  isInitialized.value = true
})

watch([theme, isInitialized], ([newTheme, initialized]) => {
  if (initialized) {
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})

provide('theme', {
  isDarkMode,
  toggleTheme,
})
</script>
