<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="card-header">
      <h2
        class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
      >
        {{ t('report.sections.operationalInformations') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <!-- Capability domain -->
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p class="text-sm font-semibold text-emerald-700 mb-1">
            {{ t('report.counts.capabilityDomains') }}
          </p>
          <p class="text-lg font-bold text-emerald-900">
            {{ data?.counts?.capability_domains ?? 0 }}
          </p>
        </div>

        <!-- Elementary level -->
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-sm font-semibold text-amber-700 mb-1">
            {{ t('report.counts.elementaryLevels') }}
          </p>
          <p class="text-lg font-bold text-amber-900">
            {{ data?.counts?.elementary_levels ?? 0 }}
          </p>
        </div>

        <!-- Action -->
        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p class="text-sm font-semibold text-purple-700 mb-1">
            {{ t('report.counts.actions') }}
          </p>
          <p class="text-lg font-bold text-purple-900">
            {{ data?.counts?.actions ?? 0 }}
          </p>
        </div>

        <!-- Disbursement Rate -->
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <p class="text-sm font-semibold text-rose-700 mb-1">
            {{ t('dashboard.disbursementRate') }}
          </p>
          <p class="text-2xl font-bold text-rose-900">
            {{ data?.budget?.disbursement_rate ?? 0 ?? 0 }} %
          </p>
        </div>

        <!-- Realization Rate -->
        <div class="p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <p class="text-sm font-semibold text-teal-700 mb-1">
            {{ t('dashboard.realizationRate') }}
          </p>
          <p class="text-2xl font-bold text-teal-900">
            {{ data?.budget?.realization_rate ?? 0 }} %
          </p>
        </div>
      </div>
    </div>

    <div class="card-header">
      <h2
        class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200"
      >
        {{ t('report.sections.financialSituation') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Budget Prévisionnel -->
        <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p class="text-sm font-semibold text-indigo-700 mb-1">
            {{ t('dashboard.plannedBudget') }}
          </p>
          <p class="text-2xl font-bold text-indigo-900 format-number">
            {{ formatCurrency(data?.budget?.planned_budget ?? 0, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Budget Acquis -->
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p class="text-sm font-semibold text-emerald-700 mb-1">
            {{ t('dashboard.acquiredBudget') }}
          </p>
          <p class="text-2xl font-bold text-emerald-900 format-number">
            {{ formatCurrency(data?.budget?.acquired_budget ?? 0, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Budget Consommé -->
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <p class="text-sm font-semibold text-rose-700 mb-1">
            {{ t('dashboard.spentBudget') }}
          </p>
          <p class="text-2xl font-bold text-rose-900 format-number">
            {{ formatCurrency(data?.budget?.spent_budget ?? 0, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Budget Disponible -->
        <div class="p-4 bg-sky-50 border border-sky-200 rounded-lg">
          <p class="text-sm font-semibold text-sky-700 mb-1">
            {{ t('dashboard.availableBudget') }}
          </p>
          <p class="text-2xl font-bold text-sky-900 format-number">
            {{ formatCurrency(data?.budget?.available_budget ?? 0, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Budget à Mobiliser -->
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-sm font-semibold text-amber-700 mb-1">
            {{ t('dashboard.budgetToMobilize') }}
          </p>
          <p class="text-2xl font-bold text-amber-900 format-number">
            {{ formatCurrency(data?.budget?.budget_to_mobilize ?? 0, currentCurrencyCode) }}
          </p>
        </div>
      </div>

      <!-- DÉCAISSEMENT PAR TYPE DE BUDGET -->
      <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
        <h3 class="text-base font-semibold text-gray-700 mb-4">
          {{ t('dashboard.disbursementByBudgetTypes') }}
        </h3>

        <div v-if="!data?.budget?.budget_types?.length" class="text-gray-500 text-sm">
          {{ t('dashboard.noDisbursementBudgetTypeData') }}
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="row in data?.budget?.budget_types"
            :key="row.type"
            class="p-4 rounded-lg border"
            style="border-color: #0284c7; background-color: #0284c720"
          >
            <p class="text-sm font-semibold mb-1 text-sky-700">
              {{ row.type }}
            </p>

            <p class="text-xl font-bold text-sky-900 format-number">
              {{ formatCurrency(row.total, currentCurrencyCode) }}
            </p>

            <p class="text-sm text-sky-700">{{ row.percent }} %</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsCurrencyStore } from '@/store';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const currencyStore = useSettingsCurrencyStore();
const { formatCurrency } = useCurrencyFormatter();

const props = defineProps({
  data: {
    type: Object,
  },
});

const currentCurrencyCode = computed(() => {
  return props.data?.currency || currencyStore.defaultCurrency?.code;
});
</script>
