<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <!-- Action buttons -->
    <div class="flex justify-end mt-4 mb-4 gap-4">
      <LinkButton
        :to="{ name: 'strategicMap' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('strategicMap.btnList') }}
      </LinkButton>

      <Button
        v-if="hasPermission(PERMISSIONS.MANAGE_PRIORITY_MATRIX)"
        :icon="Plus"
        variant="primary"
        customClass="sm:px-4"
        @click="openCreatePeriodModal"
      >
        {{ t('matrixPeriod.btnAdd') }}
      </Button>
    </div>

    <!-- Empty state -->
    <div class="w-full mx-auto bg-white rounded-lg" v-if="store.matrixPeriods.length === 0">
      <div class="card-body p-4">
        <div class="flex flex-col items-center justify-center py-6 text-center">
          <p class="text-lg text-red-600">
            {{ t('matrixPeriod.noPeriodYet') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Period panels -->
    <VExpansionPanels v-model="expanded" class="mt-4 space-y-4" v-else>
      <VExpansionPanel
        v-for="(period, index) in store.matrixPeriods"
        :key="period.uuid || index"
        :index="index"
      >
        <!-- Header -->
        <template #title>
          <div class="flex items-center justify-between w-full">
            <h2 class="text-md font-medium text-gray-700 m-0">
              {{ period.start_date }} → {{ period.end_date }}
            </h2>

            <div class="flex items-center gap-4 mr-4">
              <button
                v-if="hasPermission(PERMISSIONS.MANAGE_PRIORITY_MATRIX)"
                type="button"
                class="text-primary-500 hover:text-primary-800 transition-colors"
                @click.stop.prevent="openEditPeriodModal(period.id)"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                v-if="hasPermission(PERMISSIONS.MANAGE_PRIORITY_MATRIX)"
                type="button"
                class="text-red-500 hover:text-red-700 transition-colors"
                @click.stop.prevent="deletePeriod(period.id)"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </template>

        <!-- Body -->
        <template #body>
          <div class="p-2">
            <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
              <!-- Panel header -->
              <div class="flex items-center justify-between px-4 py-2 border-b bg-white">
                <h2 class="text-md font-semibold">
                  {{ t('matrixPeriod.objectives.panelTitle') }}
                </h2>

                <button
                  type="button"
                  class="text-green-500 hover:text-green-700 transition-colors"
                  @click.stop.prevent="openAttachObjectives(period.id)"
                  :title="t('matrixPeriod.selectObjectiveTooltip')"
                >
                  <Plus class="w-5 h-5" />
                </button>
              </div>

              <!-- Table -->
              <table class="min-w-full table-auto border-collapse">
                <thead class="bg-gray-50 text-gray-700">
                  <tr>
                    <th class="w-[10%] text-left p-2 border">
                      {{ t('matrixPeriod.objectives.table.reference') }}
                    </th>
                    <th class="w-[30%] text-left p-2 border">
                      {{ t('matrixPeriod.objectives.table.name') }}
                    </th>
                    <th class="w-[12%] text-left p-2 border">
                      {{ t('matrixPeriod.objectives.table.startDate') }}
                    </th>
                    <th class="w-[12%] text-left p-2 border">
                      {{ t('matrixPeriod.objectives.table.endDate') }}
                    </th>
                    <th class="w-[15%] text-left p-2 border">
                      {{ t('common.table.status.label') }}
                    </th>
                    <th class="w-[15%] text-left p-2 border">
                      {{ t('common.table.state') }}
                    </th>
                    <th class="w-[5%] text-center p-2 border">
                      {{ t('common.table.actions') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- No data -->
                  <tr
                    v-if="!period.strategic_objectives || period.strategic_objectives.length === 0"
                  >
                    <td
                      colspan="7"
                      class="bg-white text-center py-4 text-gray-500 border border-gray-100"
                    >
                      {{ t('matrixPeriod.objectives.table.noData') }}
                    </td>
                  </tr>

                  <!-- Data rows -->
                  <tr
                    v-for="objective in period.strategic_objectives"
                    :key="objective.uuid"
                    class="even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ objective.reference }}
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ objective.name }}
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ objective.start_date }}
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ objective.end_date }}
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200">
                      <StatusBadge :status="objective.status" />
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200">
                      <StatusBadge :status="objective.state" />
                    </td>
                    <td class="px-4 py-2 border-t border-gray-200 text-center">
                      <div class="flex justify-center gap-3">
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-700 transition"
                          @click.stop.prevent="detachObjective(period.id, objective.uuid)"
                        >
                          <TrashIcon class="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </VExpansionPanel>
    </VExpansionPanels>
  </PageStateWrapper>

  <!-- Modals -->
  <PeriodModal ref="periodModal" @success="handleSuccess" />
  <AttachObjectivesModal ref="attachObjectivesModal" @success="handleSuccess" />
</template>

<script setup>
import { Edit, Plus, TrashIcon } from 'lucide-vue-next';
import VExpansionPanels from '@/components/ui/VExpansionPanels.vue';
import VExpansionPanel from '@/components/ui/VExpansionPanel.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { useMatrixPeriodStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import PeriodModal from './components/PeriodModal.vue';
import AttachObjectivesModal from './components/AttachObjectivesModal.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const expanded = ref(0);
const periodModal = ref(null);
const attachObjectivesModal = ref(null);

const { t } = useI18n();
const route = useRoute();
const store = useMatrixPeriodStore();
store.resetForm();

const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.getMatrixPeriods(route.params.id));

const openCreatePeriodModal = () => periodModal.value.openCreateModal(route.params.id);
const openEditPeriodModal = (id) => periodModal.value.openEditModal(id);
const openAttachObjectives = (matrixPeriodId) =>
  attachObjectivesModal.value.openModal(matrixPeriodId);

const handleSuccess = async (result) => {
  await fetchWithState();

  const newPeriodUuid = result?.matrix_period?.uuid;
  if (newPeriodUuid) {
    const newIndex = store.matrixPeriods.findIndex((p) => p.uuid === newPeriodUuid);
    if (newIndex !== -1) {
      expanded.value = newIndex;
    }
  } else {
    expanded.value = expanded.value ?? 0;
  }

  showSimpleAlerte({ icon: 'success', text: result.message });
};

const deletePeriod = async (id) => {
  const confirm = await showConfirm({
    message: t('common.sweetalert.actions.confirmDelete'),
  });

  if (confirm.isConfirmed) {
    try {
      const result = await store.destroy(id);
      showSimpleAlerte({ icon: 'success', text: result.message });
      await fetchWithState();
      expanded.value = 0;
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

const detachObjective = async (matrixPeriodId, objectiveId) => {
  const confirm = await showConfirm({
    message: t('matrixPeriod.sweetalert.confirmDetachObjective'),
    confirmButtonText: t('matrixPeriod.sweetalert.confirmButtonText'),
  });

  if (confirm.isConfirmed) {
    try {
      const result = await store.detachObjective(matrixPeriodId, objectiveId);
      showSimpleAlerte({
        icon: 'success',
        text: result.message,
      });
      await fetchWithState();
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

onMounted(async () => {
  await fetchWithState();
  expanded.value = 0;
});
</script>
