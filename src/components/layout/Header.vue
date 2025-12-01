<template>
  <header class="bg-white fixed h-16 top-0 flex w-full border-b border-gray-200 z-50">
    <div class="flex items-center justify-between w-full px-4 py-3 lg:px-6 lg:py-4">
      <div class="flex items-center text-gray-800">
        <!-- Desktop -->
        <div class="hidden sm:flex items-center">
          <RouterLink to="/">
            <div class="w-[260px] h-full flex items-center justify-center">
              <img src="@/assets/images/logo.png" alt="Logo" class="h-12" />
            </div>
          </RouterLink>

          <button
            @click="handleToggle"
            class="w-10 h-10 flex items-center justify-center text-gray-800 transition duration-300"
          >
            <svg
              v-if="isMobileOpen"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.22 7.28a.75.75 0 011.06 0L12 11.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 11-1.06-1.06L10.94 12 6.22 7.28z"
                fill="currentColor"
              />
            </svg>
            <svg
              v-else
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.583 1A.75.75 0 011.333.25h13.333a.75.75 0 110 1.5H1.333A.75.75 0 010.583 1zM0.583 11a.75.75 0 01.75-.75h13.333a.75.75 0 110 1.5H1.333a.75.75 0 01-.75-.75zM1.333 5.25a.75.75 0 100 1.5h6.667a.75.75 0 100-1.5H1.333z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile -->
        <div class="flex sm:hidden items-center">
          <button
            @click="handleToggle"
            class="ml-2 w-10 h-10 flex items-center justify-center text-gray-800 transition duration-300"
          >
            <svg
              v-if="isMobileOpen"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.22 7.28a.75.75 0 011.06 0L12 11.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 11-1.06-1.06L10.94 12 6.22 7.28z"
                fill="currentColor"
              />
            </svg>
            <svg
              v-else
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.583 1A.75.75 0 011.333.25h13.333a.75.75 0 110 1.5H1.333A.75.75 0 010.583 1zM0.583 11a.75.75 0 01.75-.75h13.333a.75.75 0 110 1.5H1.333a.75.75 0 01-.75-.75zM1.333 5.25a.75.75 0 100 1.5h6.667a.75.75 0 100-1.5H1.333z"
                fill="currentColor"
              />
            </svg>
          </button>
          <RouterLink to="/">
            <div class="w-auto h-full flex items-center justify-center ml-2">
              <img
                src="@/assets/images/logo.png"
                alt="Logo"
                class="h-9 transition-all duration-300"
              />
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Right Side: Lang + Profile (vertically centered) -->
      <div class="flex items-center h-full gap-6 sm:gap-4">
        <div class="flex items-center h-full">
          <LanguageSelector v-model="lang" :languages="languages" />
        </div>
        <div class="flex items-center h-full">
          <ProfileDropdown :user="user" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar';
import LanguageSelector from './header/LanguageSelector.vue';
import ProfileDropdown from './header/ProfileDropdown.vue';
import { useAuthStore, useLanguageStore } from '@/store';
import defaultAvatar from '@/assets/images/no-avatar.png';

const { toggleSidebar, toggleMobileSidebar, isMobileOpen } = useSidebar();

function handleToggle() {
  if (window.innerWidth >= 1024) {
    toggleSidebar();
  } else {
    toggleMobileSidebar();
  }
}

const authStore = useAuthStore();
const languageStore = useLanguageStore();

const user = computed(() => ({
  ...authStore.user,
  avatar: authStore.user?.avatar || defaultAvatar,
}));

const lang = computed({
  get: () => languageStore.lang,
  set: (val) => (languageStore.lang = val),
});
const languages = languageStore.languages;
</script>
