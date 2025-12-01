<template>
  <div class="app flex flex-col min-h-screen">
    <!-- Header en haut, toujours visible -->
    <Header />

    <div class="flex flex-1 relative">
      <!-- Sidebar à gauche sous le header -->
      <div :class="sidebarClasses">
        <Sidebar />
      </div>

      <!-- Backdrop pour mobile -->
      <Backdrop />
      <!-- Contenu principal -->
      <div
        :class="['flex flex-col flex-1 min-w-0 transition-all duration-300', mainContentClasses]"
      >
        <main class="flex flex-col flex-1 bg-gray-100 relative">
          <div class="flex-1 p-4 pt-18 pb-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import Backdrop from './Backdrop.vue';
import { useSidebar } from '@/composables/useSidebar';

const { isExpanded, isHovered, isMobileOpen, isMobile, toggleSidebar } = useSidebar();

const isLargeScreen = ref(window.innerWidth >= 1024);

const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 1024;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
  updateScreenSize();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

const sidebarClasses = computed(() => ({
  'fixed left-0 transition-transform z-50 top-16 h-[calc(100%-4rem)]': true,
  // '-translate-x-full': !isLargeScreen.value && !isMobileOpen,
  // 'translate-x-0': isLargeScreen.value || isMobileOpen,
}));

const mainContentClasses = computed(() => {
  if (!isLargeScreen.value) return 'ml-0';
  if ((!isMobile.value && isExpanded.value) || isHovered.value) return 'ml-[290px]';
  return 'ml-[70px]';
});
</script>

<style scoped>
</style>
