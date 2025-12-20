<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <div class="space-y-6 mt-6">
        <!-- Select Category -->
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ t('report.selectCategory') }}
            </label>

            <select
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
          v-if="!selectedCategory"
          class="bg-white rounded-lg p-6 text-center text-gray-500"
        >
          <p class="text-lg font-medium">{{ t('report.pleaseSelect') }}</p>
          <p class="text-sm text-gray-400 mt-1">
            {{ t('report.pleaseSelectDescription') }}
          </p>
        </div>

        <!-- Active Report Component -->
        <component
          v-if="activeComponent && reportData"
          :is="activeComponent"
          :data="reportData"
        />
      </div>
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import { useMaillageReportStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

// --- Import reports ---
import ActionDomainReport from './components/ActionDomainReport.vue';
import StrategicDomainReport from './components/StrategicDomainReport.vue';
import CapabilityDomainReport from './components/CapabilityDomainReport.vue';
import ElementaryLevelReport from './components/ElementaryLevelReport.vue';

// --- Categories list ---
const categories = [
  { key: 'actiondomain', label: 'Domaine d\'action', component: ActionDomainReport },
  { key: 'strategicdomain', label: 'Domaine stratégique', component: StrategicDomainReport },
  { key: 'capabilitydomain', label: 'Domaine capacitaire', component: CapabilityDomainReport },
  { key: 'elementarylevel', label: 'Niveau élémentaire', component: ElementaryLevelReport },
];

const store = useMaillageReportStore();

const selectedCategory = ref('');
const reportData = ref(null);

const activeComponent = computed(() => {
  const cat = categories.find((c) => c.key === selectedCategory.value);
  return cat ? cat.component : null;
});

const { isLoading, hasError, errorMessage, fetchData: fetchWithState } =
  usePageState(async () => true);

// Load report when category changes
watch(selectedCategory, async () => {
  reportData.value = null;

  if (!selectedCategory.value) return;

  switch (selectedCategory.value) {
    case 'actiondomain':
      reportData.value = await store.getActionDomainReport();
      break;

    case 'strategicdomain':
      reportData.value = await store.getStrategicDomainReport();
      break;

    case 'capabilitydomain':
      reportData.value = await store.getCapabilityDomainReport();
      break;

    case 'elementarylevel':
      reportData.value = await store.getElementaryLevelReport();
      break;
  }
});

onMounted(async () => {
  await fetchWithState();
});
</script>
