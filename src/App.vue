<template>
  <ThemeProvider>
    <SidebarProvider>
      <div
        v-if="!authStore.isInitialized"
        class="flex flex-col items-center justify-center min-h-screen bg-white"
      >
        <SkeletonLoader :rows="5" height="h-4" class="w-full max-w-md" />
      </div>
      <RouterView v-else />
    </SidebarProvider>
  </ThemeProvider>
  <!-- Global Loader (always available, but active only when needed) -->
  <teleport to="body">
    <Loader
      v-model:active="loaderStore.isLoading"
      :can-cancel="loaderStore.canCancel"
      :is-full-page="loaderStore.fullPage"
      :color="loaderStore.color"
      :width="loaderStore.width"
      :height="loaderStore.height"
    />
  </teleport>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore, useLoaderStore } from '@/store';
import ThemeProvider from '@/components/layout/ThemeProvider.vue';
import SidebarProvider from '@/components/layout/SidebarProvider.vue';
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue';

const route = useRoute();
const { t } = useI18n();
const authStore = useAuthStore();
const loaderStore = useLoaderStore();
const appName = import.meta.env.VITE_APP_NAME || 'VA';

// Mise à jour titre
watch(
  () => route.meta.title,
  (title) => {
    const translatedTitle = title ? t(title) : '';
    document.title = translatedTitle ? `${translatedTitle} | ${appName}` : appName;
  },
  { immediate: true }
);
</script>
