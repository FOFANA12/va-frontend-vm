<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click.prevent="toggleDropdown"
      class="flex items-center text-left text-gray-700 dark:text-gray-400"
      aria-label="Profil utilisateur"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img :src="user.avatar" alt="Avatar" class="object-cover h-full w-full" />
      </span>

      <div
        class="hidden md:flex flex-col items-start leading-none overflow-hidden min-w-[100px] max-w-[150px]"
      >
        <span class="text-sm font-medium truncate w-full">
          {{ user.name }}
        </span>
        <span class="text-xs text-gray-500 truncate w-full">
          {{ user.employee && user.employee.structure ? user.employee.structure.abbreviation : user.email }}
        </span>
      </div>

      <ChevronDown
        :class="{ 'rotate-180': dropdownOpen }"
        class="ml-2 w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform pointer-events-none"
      />
    </button>

    <!-- Dropdown -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[12px] flex flex-col rounded-2xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-10 min-w-[200px] max-w-[260px]"
    >
      <!-- Header -->
      <div class="px-6 py-2 border-b border-gray-200 dark:border-gray-800">
        <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400 truncate">
          {{ user.name }}
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400 truncate">
          {{ user.email }}
        </span>
      </div>

      <!-- Menu items -->
      <div class="px-2 border-b border-gray-200 dark:border-gray-800">
        <router-link
          :to="{ name: 'profile' }"
          class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-primary-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          @click="closeDropdown"
        >
          <UserCircle
            class="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 pointer-events-none"
          />
          {{ t('header.profile.myProfile') }}
        </router-link>
      </div>

      <!-- Sign out -->
      <button
        @click="logout"
        class="flex items-center gap-3 px-4 py-2 m-1 mx-2 font-medium text-red-600 rounded-lg group text-theme-sm hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
      >
        <LogOut
          class="w-4 h-4 text-red-500 group-hover:text-red-700 dark:group-hover:text-red-300 pointer-events-none"
        />
        {{ t('header.profile.logout') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { UserCircle, ChevronDown, LogOut } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/store';

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const { user } = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
function closeDropdown() {
  dropdownOpen.value = false;
}
function onClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    closeDropdown();
  }
}
onMounted(() => document.addEventListener('click', onClickOutside));
onUnmounted(() => document.removeEventListener('click', onClickOutside));

const logout = async () => {
  try {
    const resp = await authStore.logout();
    router.push({
      name: 'login',
      query: { type: 'success', message: resp.data.message },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
