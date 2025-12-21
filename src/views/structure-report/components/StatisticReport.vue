<template>
  <div class="space-y-6 mt-6">
    <!-- Select subcategory -->
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-6 lg:col-span-4">
        <label for="report-sub-category" class="block text-sm font-medium text-gray-700 mb-1">
          {{ t('report.selectSubCategory') }}
        </label>
        <select
          id="report-sub-category"
          v-model="selectedSubCategory"
          class="bg-white w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">
            {{ t('report.selectSubCategory') }}
          </option>
          <option v-for="cat in subCategories" :key="cat.key" :value="cat.key">
            {{ cat.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Placeholder -->
    <div
      class="bg-white rounded-lg p-6 text-center text-gray-500"
      v-if="!props.structure || !selectedSubCategory"
    >
      <p class="text-lg font-medium">
        {{ t('report.pleaseSelectSubCategory') }}
      </p>
      <p class="text-sm text-gray-400 mt-1">
        {{ t('report.pleaseSelectDescription') }}
      </p>
    </div>

    <!-- Active Component -->
    <component v-if="props.structure && activeComponent" :is="activeComponent" :data="reportData" />
  </div>
</template>

<script setup>
import { useStructureReportStore } from '@/store';

// Tes composants pour chaque type de statistique
import AcquisitionReport from './statistics/AcquisitionReport.vue';
import ExpenseReport from './statistics/ExpenseReport.vue';

// import ObjectiveReport from './statistics/ObjectiveReport.vue';
// import AxisReport from './statistics/AxisReport.vue';
// import MapReport from './statistics/MapReport.vue';

const { t } = useI18n();
const store = useStructureReportStore();

const props = defineProps({
  structure: {
    type: Object,
    required: true,
  },
});

// Définition des sous-catégories
const subCategories = [
  {
    key: 'acquisitions',
    label: 'Acquisitions',
    component: AcquisitionReport,
    fetch: (id) => store.getAcquisitionReport(id),
  },
  {
    key: 'expenses',
    label: 'Dépenses globales',
    component: ExpenseReport,
    fetch: (id) => store.getGlobalExpenseReport(id),
  },

  // { key: 'objectives', label: 'Par Objectif stratégique', component: ObjectiveReport, fetch: (id) => store.getExpensesByObjective(id) },
  // { key: 'axes', label: 'Par Axe stratégique', component: AxisReport, fetch: (id) => store.getExpensesByAxis(id) },
  // { key: 'maps', label: 'Par Carte stratégique', component: MapReport, fetch: (id) => store.getExpensesByMap(id) },
];

const selectedSubCategory = ref('');
const reportData = ref(null);

const activeComponent = computed(() => {
  const cat = subCategories.find((c) => c.key === selectedSubCategory.value);
  return cat ? cat.component : null;
});

watch([() => selectedSubCategory.value, () => props.structure], async ([newCat, newStruct]) => {
  reportData.value = null;

  if (newCat && newStruct?.id) {
    const cat = subCategories.find((c) => c.key === newCat);
    if (cat) {
      reportData.value = await cat.fetch(newStruct.id);
    }
  }
});
</script>
