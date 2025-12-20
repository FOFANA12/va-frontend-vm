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
          <div v-if="!userHasStructure" class="col-span-12 md:col-span-6 lg:col-span-4">
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
              <option v-for="s in structureReportStore.structures" :key="s.uuid" :value="s.id">
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

        <!-- Placeholder -->
        <div
          v-if="!currentStructure || !selectedCategory"
          class="bg-white rounded-lg p-6 text-center text-gray-500"
        >
          <p class="text-lg font-medium">
            {{ t('dashboard.pleaseSelect') }}
          </p>
          <p class="text-sm text-gray-400 mt-1">
            {{ t('dashboard.pleaseSelectDescription') }}
          </p>
        </div>

        <!-- Active Component -->
        <component
          v-if="currentStructure && activeComponent"
          :is="activeComponent"
          :structure="currentStructure"
          :reportData="reportData"
        />
      </div>
    </PageStateWrapper>
  </DefaultLayout>
</template>


<script setup>
import { useStructureReportStore, useDahsboardReportStore, useAuthStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import GeneralReport from './components/GeneralReport.vue';
import StrategicReport from './components/StrategicReport.vue';
import OperationalReport from './components/OperationalReport.vue';
import FinancialReport from './components/FinancialReport.vue';

const authStore = useAuthStore();
const dashboardReportStore = useDahsboardReportStore();
const structureReportStore = useStructureReportStore();

const selectedCategory = ref('');
const selectedStructure = ref('');
const reportData = ref(null);

const userHasStructure = computed(() => {
  return !!authStore.user?.employee?.structure;
});

const currentStructure = computed(() => {
  if (userHasStructure.value) {
    return authStore.user.employee.structure;
  }
  return structureReportStore.structures.find((s) => s.id === selectedStructure.value);
});

const categories = [
  { key: 'general', label: 'Vue Générale', component: GeneralReport },
  { key: 'strategic', label: 'Vue Stratégique', component: StrategicReport },
  { key: 'operational', label: 'Vue Opérationnelle', component: OperationalReport },
  { key: 'financial', label: 'Vue Financière', component: FinancialReport },
];

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
  if (userHasStructure.value) {
    selectedCategory.value = 'general';
    reportData.value = await dashboardReportStore.getGeneralReport(
      authStore.user.employee.structure.id
    );
  } else {
    await structureReportStore.requirements();
  }
});

watch([selectedCategory, selectedStructure], async () => {
  reportData.value = null;

  if (!currentStructure.value) return;

  if (selectedCategory.value === 'general') {
    reportData.value = await dashboardReportStore.getGeneralReport(currentStructure.value.id);
  } else if (selectedCategory.value === 'strategic') {
    reportData.value = await dashboardReportStore.getStrategicReport(currentStructure.value.id);
  } else if (selectedCategory.value === 'operational') {
    reportData.value = await dashboardReportStore.getOperationalReport(currentStructure.value.id);
  } else if (selectedCategory.value === 'financial') {
    reportData.value = await dashboardReportStore.getFinancialReport(currentStructure.value.id);
  }
});

onMounted(async () => {
  await fetchWithState();
});
</script>
