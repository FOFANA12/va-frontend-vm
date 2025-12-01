<template>
    <div
      v-if="isLoading || hasError"
      class="flex flex-1 items-center justify-center w-full h-full"
    >
      <SkeletonLoader v-if="isLoading" :rows="5" height="h-4" class="w-full max-w-md" />
      <FetchError v-else :message="errorMessage" :onRetry="onRetry" class="w-full max-w-md" />
    </div>
  
    <div v-else>
      <slot />
    </div>
  </template>
  
  <script setup>
  defineProps({
    isLoading: Boolean,
    hasError: Boolean,
    errorMessage: {
      type: String,
      default: 'Une erreur est survenue',
    },
    onRetry: Function,
  });
  </script>
  