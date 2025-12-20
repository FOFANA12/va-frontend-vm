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

      <!-- Failed Objectives -->
      <div class="p-4 bg-red-50 border border-red-200 rounded-lg relative">
        <p class="text-sm font-semibold text-red-700 mb-1">
          {{ t('dashboard.failedObjectives') }}
        </p>

        <p class="text-2xl font-bold text-red-900">
          {{ reportData?.failed_objectives_count ?? 0 }}
        </p>

        <!-- Bouton de lien -->
        <router-link
          :to="{ name: 'strategicObjective', query: { nature: 'failed' } }"
          class="text-xs text-red-700 underline absolute bottom-2 right-4 hover:text-red-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>

      <!-- Alert Objectives -->
      <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg relative">
        <p class="text-sm font-semibold text-orange-700 mb-1">
          {{ t('dashboard.alertObjectives') }}
        </p>

        <p class="text-2xl font-bold text-orange-900">
          {{ reportData?.alert_objectives_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'strategicObjective', query: { nature: 'alert' } }"
          class="text-xs text-orange-700 underline absolute bottom-2 right-4 hover:text-orange-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>

      <!-- Failed Actions -->
      <div class="p-4 bg-red-100 border border-red-300 rounded-lg relative">
        <p class="text-sm font-semibold text-red-800 mb-1">
          {{ t('dashboard.failedActions') }}
        </p>

        <p class="text-2xl font-bold text-red-900">
          {{ reportData?.failed_actions_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'action', query: { nature: 'failed' } }"
          class="text-xs text-red-800 underline absolute bottom-2 right-4 hover:text-red-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>

      <!-- Alert Actions -->
      <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg relative">
        <p class="text-sm font-semibold text-yellow-700 mb-1">
          {{ t('dashboard.alertActions') }}
        </p>

        <p class="text-2xl font-bold text-yellow-800">
          {{ reportData?.alert_actions_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'action', query: { nature: 'alert' } }"
          class="text-xs text-yellow-700 underline absolute bottom-2 right-4 hover:text-yellow-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>
    </div>

    <!-- Status Objective Chart -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.objectivesStatusDistribution') }}
      </h3>

      <!-- Si la liste est vide -->
      <div v-if="!reportData?.objectives_status_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noObjectivesStatusData') }}
      </div>

      <!-- Sinon affiche les cartes -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="status in reportData.objectives_status_distribution"
          :key="status.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: status.color,
            backgroundColor: status.color + '20',
          }"
        >
          <!-- Nom (déjà traduit côté backend) -->
          <p class="text-sm font-semibold mb-1" :style="{ color: status.color }">
            {{ status.name }}
          </p>

          <!-- Pourcentage -->
          <p class="text-2xl font-bold" :style="{ color: status.color }">{{ status.value }} %</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reportData: {
    type: Object,
    default: () => ({}),
  },
});
</script>
