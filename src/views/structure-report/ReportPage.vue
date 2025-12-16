<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <div class="space-y-6 mt-6">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <label for="structure" class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('report.selectStructure') }}
            </label>
            <select
              id="structure"
              v-model="selectedStructure"
              class="bg-white w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">
                {{ t('report.selectStructure') }}
              </option>
              <option v-for="s in store.structures" :key="s.uuid" :value="s.id">
                {{ s.name }}
              </option>
            </select>
          </div>

          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <label for="report-category" class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('report.selectCategory') }}
            </label>
            <select
              id="report-category"
              v-model="selectedCategory"
              class="bg-white w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">
                {{ t('report.selectCategory') }}
              </option>
              <option v-for="cat in categories" :key="cat.key" :value="cat.key">
                {{ cat.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Active Report or Placeholder -->
        <div
          class="bg-white rounded-lg p-6 text-center text-gray-500"
          v-if="!selectedStructure || !selectedCategory"
        >
          <p class="text-lg font-medium">
            {{ t('report.pleaseSelect') }}
          </p>
          <p class="text-sm text-gray-400 mt-1">
            {{ t('report.pleaseSelectDescription') }}
          </p>
        </div>

        <component
          v-if="currentStructure"
          :is="activeComponent"
          :structure="currentStructure"
          :data="selectedCategory === 'performance' ? reportData : null"
        />
      </div>
    </PageStateWrapper>
  </DefaultLayout>
</template>


<script setup>
import { useStructureReportStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import PerformanceReport from './components/PerformanceReport.vue';
import StatisticReport from './components/StatisticReport.vue';

const categories = [
  { key: 'performance', label: 'Indicateurs de Performance', component: PerformanceReport },
  { key: 'statistics', label: 'Statistiques', component: StatisticReport },
];

const store = useStructureReportStore();

const selectedCategory = ref('');
const selectedStructure = ref('');
const reportData = ref(null);

const currentStructure = computed(() => {
  return store.structures.find((s) => s.id === selectedStructure.value);
});

const activeComponent = computed(() => {
  const cat = categories.find((c) => c.key === selectedCategory.value);
  return cat ? cat.component : null;
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await store.requirements();
});

watch([selectedCategory, selectedStructure], async () => {
  reportData.value = null;
  if (selectedCategory.value === 'performance' && selectedStructure.value) {
    reportData.value = await store.getPerformanceReport(selectedStructure.value);
  }
});

onMounted(async () => {
  await fetchWithState();
});
</script>
