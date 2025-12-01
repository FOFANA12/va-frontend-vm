<template>
  <FullScreenLayout>
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div
        class="w-full max-w-lg mx-4 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 shadow-sm rounded-xl overflow-hidden"
      >
        <div class="p-6">
          <div class="text-center space-y-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center justify-center blur-lg opacity-50">
                <Ghost class="h-32 w-32 text-gray-400" />
              </div>
              <div class="relative flex justify-center animate-fade-in">
                <Ghost class="h-32 w-32 text-gray-400" />
              </div>
            </div>

            <div class="space-y-2 animate-fade-in">
              <h1
                class="text-7xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
              >
                {{ t('notFound.code') }}
              </h1>
              <div class="space-y-2">
                <p class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {{ t('notFound.title') }}
                </p>
                <p class="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                  {{ t('notFound.description') }}
                </p>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-center gap-4 animate-fade-in">
              <button
                @click="goBack"
                class="min-w-[120px] px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 transition-colors text-sm font-medium text-white shadow-sm"
              >
                {{ t('notFound.btnBack') }}
              </button>

              <button
                @click="goHome"
                class="min-w-[120px] px-4 py-2 rounded-md border border-primary-500 text-primary-600 hover:bg-primary-50 transition-colors text-sm font-medium"
              >
                {{ t('notFound.btnHome') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>
      
<script setup>
import { useRouter } from 'vue-router';
import { Ghost } from 'lucide-vue-next';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push({ name: 'dashboard' });
};
</script>
      