<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200">
        {{ t('report.sections.budgetIndicator') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <!-- Planned Budget -->
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p class="text-sm font-semibold text-amber-700 mb-1">
            {{ t('report.plannedBudget') }}
          </p>
          <p class="text-lg font-bold text-amber-900">
            {{ formatCurrency(data?.planned_budget, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Acquired Budget -->
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm font-semibold text-blue-700 mb-1">
            {{ t('report.acquiredBudget') }}
          </p>
          <p class="text-lg font-bold text-blue-900">
            {{ formatCurrency(data?.acquired_budget, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Spent Budget -->
        <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <p class="text-sm font-semibold text-rose-700 mb-1">
            {{ t('report.spentBudget') }}
          </p>
          <p class="text-lg font-bold text-rose-900">
            {{ formatCurrency(data?.spent_budget, currentCurrencyCode) }}
          </p>
        </div>

        <!-- Available Budget -->
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p class="text-sm font-semibold text-emerald-700 mb-1">
            {{ t('report.availableBudget') }}
          </p>
          <p class="text-lg font-bold text-emerald-900">
            {{ formatCurrency(data?.available_budget, currentCurrencyCode) }}
          </p>
        </div>
      </div>
      <!-- Extra details -->
      <ul class="divide-y divide-gray-200 bg-white rounded-lg mb-6">
        <li class="flex justify-between px-4 py-2">
          <span>{{ t('report.budgetToMobilize') }}</span>
          <span class="font-bold text-red-600">
            {{ formatCurrency(data?.budget_to_mobilize, currentCurrencyCode) }}
          </span>
        </li>
        <li class="flex justify-between px-4 py-2">
          <span>{{ t('report.disbursementRate') }}</span>
          <span class="font-bold text-green-600"> {{ data?.disbursement_rate ?? 0 }} % </span>
        </li>
      </ul>
    </div>
  </div>

  <div class="w-full mx-auto rounded-lg">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200">
        {{ t('report.sections.realizationIndicator') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>
    <div class="card-body pt-4">
      <!-- Realization Details -->
      <ul class="divide-y divide-gray-200 bg-white rounded-lg mb-6 w-full">
        <li class="flex justify-between px-4 py-2">
          <span>{{ t('report.realizationRate') }}</span>
          <span class="font-bold text-blue-600"> {{ data?.realization_rate ?? 0 }} % </span>
        </li>
        <li class="flex justify-between px-4 py-2">
          <span>{{ t('report.realizationIndex') }}</span>
          <span class="font-bold text-indigo-600">
            {{ data?.realization_index ?? 0 }}
          </span>
        </li>
      </ul>
    </div>
  </div>

  <div class="w-full mx-auto rounded-lg mt-6">
    <div class="card-header">
      <h2 class="text-lg p-4 px-0 pt-2 pb-2 text-primary-600 font-bold border-b-2 border-primary-200">
        {{ t('report.sections.delayIndicator') }}
      </h2>
      <hr class="border-t border-gray-200 w-full mb-0" />
    </div>

    <div class="col-span-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <!-- Duration Variance (days) -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <p class="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              {{ t('report.delay.durationVarianceDays') }}
            </p>
            <p class="text-lg font-bold text-amber-900">
              {{ data?.duration_variance_days ?? '–' }}
            </p>
          </div>
        </div>

        <!-- Duration Overrun Rate (%) -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <p class="text-xs font-semibold text-red-700 uppercase tracking-wider">
              {{ t('report.delay.durationOverrunRate') }}
            </p>
            <p class="text-lg font-bold text-red-900">{{ data?.duration_overrun_rate ?? 0 }} %</p>
          </div>
        </div>

        <!-- Delay Variance (days) -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              {{ t('report.delay.delayVarianceDays') }}
            </p>
            <p class="text-lg font-bold text-indigo-900">
              {{ data?.delay_variance_days ?? '–' }}
            </p>
          </div>
        </div>

        <!-- Delay Overrun Rate (%) -->
        <div
          class="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative">
            <p class="text-xs font-semibold text-purple-700 uppercase tracking-wider">
              {{ t('report.delay.delayOverrunRate') }}
            </p>
            <p class="text-lg font-bold text-purple-900">{{ data?.delay_overrun_rate ?? 0 }} %</p>
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
  structure: {
    type: Object,
    required: true,
  },
  data: {
    type: Object,
  },
});

const currentCurrencyCode = computed(() => {
  return props.data?.currency || currencyStore.defaultCurrency?.code;
});
</script>
