<template>
  <div class="w-full mx-auto rounded-lg">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Indicators Count -->
      <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm font-semibold text-blue-700 mb-1">
          {{ t('dashboard.indicatorsCount') }}
        </p>
        <p class="text-2xl font-bold text-blue-900">
          {{ reportData?.indicators_count ?? 0 }}
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

      <!-- Failed Objectives -->
      <div class="p-4 bg-red-50 border border-red-200 rounded-lg relative">
        <p class="text-sm font-semibold text-red-700 mb-1">
          {{ t('dashboard.failedObjectives') }}
        </p>

        <p class="text-2xl font-bold text-red-900">
          {{ reportData?.failed_objectives_count ?? 0 }} /
          {{ reportData?.lead_objectives_count ?? 0 }}
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
          {{ reportData?.alert_objectives_count ?? 0 }} /
          {{ reportData?.lead_objectives_count ?? 0 }}
        </p>

        <router-link
          :to="{ name: 'strategicObjective', query: { nature: 'alert' } }"
          class="text-xs text-orange-700 underline absolute bottom-2 right-4 hover:text-orange-900"
        >
          {{ t('dashboard.seeDetails') }}
        </router-link>
      </div>
    </div>

    <!-- Status Objective -->
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

          <!-- Nbre -->
          <p class="text-2xl font-bold" :style="{ color: status.color }">
            {{ status.count }} / {{ reportData?.lead_objectives_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>

    <!-- State Objective -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.objectivesStateDistribution') }}
      </h3>

      <!-- Message si vide -->
      <div v-if="!reportData?.objectives_state_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noObjectivesStateData') }}
      </div>

      <!-- Cartes -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="state in reportData.objectives_state_distribution"
          :key="state.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: state.color,
            backgroundColor: state.color + '20',
          }"
        >
          <!-- Nom d'état (déjà traduit par backend) -->
          <p class="text-sm font-semibold mb-1" :style="{ color: state.color }">
            {{ state.name }}
          </p>

          <!-- Nbre -->
          <p class="text-2xl font-bold" :style="{ color: state.color }">
            {{ state.count }} / {{ reportData?.lead_objectives_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicators Status Distribution -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.indicatorsStatusDistribution') }}
      </h3>

      <!-- Si vide -->
      <div v-if="!reportData?.indicators_status_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noIndicatorsStatusData') }}
      </div>

      <!-- Sinon afficher les cartes -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="status in reportData.indicators_status_distribution"
          :key="status.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: status.color,
            backgroundColor: status.color + '20',
          }"
        >
          <p class="text-sm font-semibold mb-1" :style="{ color: status.color }">
            {{ status.name }}
          </p>

          <p class="text-2xl font-bold" :style="{ color: status.color }">
            {{ status.count }} / {{ reportData?.indicators_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicators State Distribution -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.indicatorsStateDistribution') }}
      </h3>

      <!-- Si vide -->
      <div v-if="!reportData?.indicators_state_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noIndicatorsStateData') }}
      </div>

      <!-- Sinon cartes -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="state in reportData.indicators_state_distribution"
          :key="state.code"
          class="p-4 rounded-lg border"
          :style="{
            borderColor: state.color,
            backgroundColor: state.color + '20',
          }"
        >
          <p class="text-sm font-semibold mb-1" :style="{ color: state.color }">
            {{ state.name }}
          </p>

          <p class="text-2xl font-bold" :style="{ color: state.color }">
            {{ state.count }} / {{ reportData?.indicators_count ?? 0 }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicators Categories -->
    <div class="col-span-1 md:col-span-2 bg-white rounded-lg p-4 mt-6">
      <h3 class="text-base font-semibold text-gray-700 mb-4">
        {{ t('dashboard.indicatorCategories') }}
      </h3>

      <!-- Si aucune catégorie -->
      <div v-if="!reportData?.indicators_category_distribution?.length" class="text-gray-500 text-sm">
        {{ t('dashboard.noIndicatorCategoryData') }}
      </div>

      <!-- Sinon affiche les catégories -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="cat in reportData.indicators_category_distribution"
          :key="cat.category_uuid"
          class="p-4 rounded-lg border relative"
          :style="{
            borderColor: '#3b82f6', // bleu cohérent
            backgroundColor: '#3b82f620', // 12% opacity
          }"
        >
          <!-- Nom de la catégorie -->
          <p class="text-sm font-semibold mb-1 text-blue-700">
            {{ cat.name }}
          </p>

          <!-- Nombre d'indicateurs -->
          <p class="text-2xl font-bold text-blue-900">
            {{ cat.count }} / {{ reportData?.indicators_count ?? 0 }}
          </p>

          <!-- Lien pour voir la liste -->
          <router-link
            :to="{ name: 'indicator', query: { category: cat.category_uuid } }"
            class="text-xs underline text-blue-700 absolute bottom-2 right-4 hover:text-blue-900"
          >
            {{ t('dashboard.seeDetails') }}
          </router-link>
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
