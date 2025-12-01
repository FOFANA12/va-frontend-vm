<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Active Structures -->
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm font-semibold text-blue-700 mb-1">
          {{ t('dashboard.structuresActiveCount') }}
        </p>
        <p class="text-2xl font-bold text-blue-900">
          {{ reportData?.structures_active_count ?? 0 }}
        </p>
      </div>

      <!-- Active Strategic Maps -->
      <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p class="text-sm font-semibold text-emerald-700 mb-1">
          {{ t('dashboard.strategicMapsActiveCount') }}
        </p>
        <p class="text-2xl font-bold text-emerald-900">
          {{ reportData?.strategic_maps_active_count ?? 0 }}
        </p>
      </div>

      <!-- Strategic Axes -->
      <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p class="text-sm font-semibold text-amber-700 mb-1">
          {{ t('dashboard.strategicAxesCount') }}
        </p>
        <p class="text-2xl font-bold text-amber-900">
          {{ reportData?.strategic_axes_count ?? 0 }}
        </p>
      </div>

      <!-- Lead Objectives -->
      <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p class="text-sm font-semibold text-purple-700 mb-1">
          {{ t('dashboard.leadObjectivesCount') }}
        </p>
        <p class="text-2xl font-bold text-purple-900">
          {{ reportData?.lead_objectives_count ?? 0 }}
        </p>
      </div>

      <!-- Actions Count -->
      <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p class="text-sm font-semibold text-indigo-700 mb-1">
          {{ t('dashboard.actionsCount') }}
        </p>
        <p class="text-2xl font-bold text-indigo-900">
          {{ reportData?.actions_count ?? 0 }}
        </p>
      </div>

      <!-- Realization Rate -->
      <div class="p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p class="text-sm font-semibold text-teal-700 mb-1">
          {{ t('dashboard.realizationRate') }}
        </p>
        <p class="text-2xl font-bold text-teal-900">{{ reportData?.realization_rate ?? 0 }} %</p>
      </div>

      <!-- Disbursement Rate -->
      <div class="p-4 bg-rose-50 border border-rose-200 rounded-lg">
        <p class="text-sm font-semibold text-rose-700 mb-1">
          {{ t('dashboard.disbursementRate') }}
        </p>
        <p class="text-2xl font-bold text-rose-900">{{ reportData?.disbursement_rate ?? 0 }} %</p>
      </div>

      <!-- Realization Index -->
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <p class="text-sm font-semibold text-slate-700 mb-1">
          {{ t('dashboard.realizationIndex') }}
        </p>
        <p class="text-2xl font-bold text-slate-900">
          {{ reportData?.realization_index ?? 0 }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <!-- Objectives Chart -->
      <div class="bg-white rounded-lg p-4">
        <h3 class="text-base font-semibold text-gray-700 mb-4">
          {{ t('dashboard.objectivesStatus') }}
        </h3>
        <PieChart
          :labels="[t('dashboard.failedObjectives'), t('dashboard.alertObjectives')]"
          :datasets="[
            {
              data: [
                reportData?.failed_objectives_count ?? 0,
                reportData?.alert_objectives_count ?? 0,
              ],
              backgroundColor: ['#ef4444', '#f59e0b'], // rouge + orange
            },
          ]"
          unit=""
          :height="250"
        />
      </div>

      <!-- Actions Chart -->
      <div class="bg-white rounded-lg p-4">
        <h3 class="text-base font-semibold text-gray-700 mb-4">
          {{ t('dashboard.actionsStatus') }}
        </h3>
        <PieChart
          :labels="[t('dashboard.failedActions'), t('dashboard.alertActions')]"
          :datasets="[
            {
              data: [reportData?.failed_actions_count ?? 0, reportData?.alert_actions_count ?? 0],
              backgroundColor: ['#dc2626', '#eab308'], // rouge foncé + jaune
            },
          ]"
          unit=""
          :height="250"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import PieChart from '@/components/ui/charts/PieChart.vue';

const { t } = useI18n();

const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
});
</script>
