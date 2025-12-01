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
        :to="backRoute"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>

      <Button
        v-if="actionStore.form.is_planned"
        :icon="RefreshCw"
        variant="primary-outline"
        customClass="sm:px-4"
        @click="handleUseDefaultPhases"
      >
        {{ t('actionPhase.btnUseDefaultPhases') }}
      </Button>

      <Button :icon="Plus" variant="primary" customClass="sm:px-4" @click="openCreateModal">
        {{ t('actionPhase.btnAdd') }}
      </Button>
    </div>

    <!-- No phase yet -->
    <div class="w-full mx-auto bg-white rounded-lg" v-if="phaseStore.phases.length === 0">
      <div class="card-body p-4">
        <div class="flex flex-col items-center justify-center py-6 text-center">
          <p class="text-lg text-red-600">
            {{ t('actionPhase.noPhaseYet') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Expansion panels for phases -->
    <VExpansionPanels v-model="expanded" class="mt-4 space-y-4" v-else>
      <VExpansionPanel
        v-for="(phase, index) in phaseStore.phases"
        :key="phase.uuid || index"
        :index="index"
      >
        <!-- Header -->
        <template #title>
          <div class="flex items-center justify-between w-full">
            <h2 class="text-md font-medium text-gray-700 m-0">
              {{ t('actionPhase.panelTitle', { num: phase.number }) }}
            </h2>

            <div class="flex items-center gap-4 mr-4">
              <button
                type="button"
                class="text-primary-500 hover:text-primary-800 transition-colors"
                @click.stop.prevent="openEditModal(phase.id)"
              >
                <Edit class="w-5 h-5" />
              </button>
              <button
                type="button"
                class="text-red-500 hover:text-red-700 transition-colors"
                @click.stop.prevent="onDeletePhase(phase.id)"
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
              <div class="card-body p-4">
                <div class="grid grid-cols-12 gap-4">
                  <!-- Number -->
                  <div class="col-span-12 md:col-span-4">
                    <InputReadonly
                      id="number"
                      name="number"
                      :label="t('actionPhase.form.number')"
                      :model-value="phase.number"
                    />
                  </div>

                  <!-- Name -->
                  <div class="col-span-12 md:col-span-4">
                    <InputReadonly
                      id="name"
                      name="name"
                      :label="t('actionPhase.form.name')"
                      :model-value="phase.name"
                    />
                  </div>

                  <!-- Start Date -->
                  <div class="col-span-12 md:col-span-4">
                    <InputReadonly
                      id="start_date"
                      name="start_date"
                      :label="t('actionPhase.form.startDate')"
                      :model-value="phase.start_date"
                    />
                  </div>

                  <!-- End Date -->
                  <div class="col-span-12 md:col-span-4">
                    <InputReadonly
                      id="end_date"
                      name="end_date"
                      :label="t('actionPhase.form.endDate')"
                      :model-value="phase.end_date"
                    />
                  </div>

                  <!-- Weight -->
                  <div class="col-span-12 md:col-span-4">
                    <InputReadonly
                      id="weight"
                      name="weight"
                      :label="t('actionPhase.form.weight')"
                      :model-value="phase.weight"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-12 gap-4 mt-6">
                  <div class="col-span-12 md:col-span-6">
                    <TextareaReadonly
                      id="description"
                      name="description"
                      :label="t('task.form.description')"
                      :placeholder="t('task.form.descriptionPlaceholder')"
                      :modelValue="phase.description"
                      readonly
                      :rows="10"
                    />
                  </div>

                  <div class="col-span-12 md:col-span-6">
                    <TextareaReadonly
                      id="deliverable"
                      name="deliverable"
                      :label="t('task.form.deliverable')"
                      :placeholder="t('task.form.deliverablePlaceholder')"
                      :modelValue="phase.deliverable"
                      readonly
                      :rows="10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
              <div class="flex items-center justify-between px-4 py-2 border-b bg-white">
                <h2 class="text-md font-semibold">
                  {{ t('actionPhase.tasks.panelTitle') }}
                </h2>

                <button
                  type="button"
                  class="text-green-500 hover:text-green-700 transition-colors"
                  @click.stop.prevent="openCreateTaskModal(phase.id)"
                  :title="t('matrixPeriod.selectObjectiveTooltip')"
                >
                  <Plus class="w-5 h-5" />
                </button>
              </div>
              <hr class="border-t border-gray-200 w-full mb-0" />

              <table class="min-w-full table-auto border-collapse">
                <thead class="bg-gray-50 text-gray-700 font-semibold">
                  <tr>
                    <th class="w-[25%] px-4 py-2 border-b border-gray-300 text-left ">
                      {{ t('actionPhase.tasks.table.title') }}
                    </th>
                    <th class="w-[12%] px-4 py-2 border-b border-gray-300 text-left">
                      {{ t('actionPhase.tasks.table.startDate') }}
                    </th>
                    <th class="w-[12%] px-4 py-2 border-b border-gray-300 text-left">
                      {{ t('actionPhase.tasks.table.endDate') }}
                    </th>
                    <th class="w-[18%] px-4 py-2 border-b border-gray-300 text-left">
                      {{ t('actionPhase.tasks.table.assigned') }}
                    </th>
                    <th class="w-[10%] px-4 py-2 border-b border-gray-300 text-left">
                      {{ t('actionPhase.tasks.table.priority') }}
                    </th>
                    <th class="w-[10%] px-4 py-2 border-b border-gray-300 text-center">
                      {{ t('actionPhase.tasks.table.status') }}
                    </th>
                    <th class="w-[13%] px-4 py-2 border-b border-gray-300 text-center">
                      {{ t('common.table.actions') }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-if="!phase.tasks || phase.tasks.length === 0">
                    <td
                      colspan="7"
                      class="bg-white text-center py-4 text-gray-500 border border-gray-100"
                    >
                      {{ t('actionPhase.tasks.table.noData') }}
                    </td>
                  </tr>

                  <tr
                    v-for="task in phase.tasks"
                    :key="task.uuid"
                    class="even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ task.title }}
                    </td>

                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ task.start_date }}
                    </td>

                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ task.end_date }}
                    </td>

                    <td class="px-4 py-2 border-t border-gray-200 truncate">
                      {{ task.assigned_to || '-' }}
                    </td>

                    <td class="px-4 py-2 border-t border-gray-200">
                      {{ task.priority?.label || '-' }}
                    </td>

                    <td class="px-4 py-2 border-t border-gray-200 text-center">
                      <button
                        type="button"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition"
                        :class="
                          task.is_completed
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        "
                        @click.stop.prevent="toggleTask(task)"
                      >
                        <template v-if="task.is_completed">
                          ✅ {{ t('actionPhase.tasks.table.completed') }}
                        </template>
                        <template v-else>
                          ⏳ {{ t('actionPhase.tasks.table.inProgress') }}
                        </template>
                      </button>
                    </td>

                    <!-- Actions -->
                    <td class="px-4 py-2 border-t border-gray-200 text-center">
                      <div class="flex justify-center gap-3">
                        <button
                          type="button"
                          class="text-gray-500 hover:text-gray-800 transition"
                          @click.stop.prevent="openViewTaskModal(task.id)"
                        >
                          <Eye class="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          class="text-primary-500 hover:text-primary-800 transition"
                          @click.stop.prevent="openEditTaskModal(task.id)"
                        >
                          <Edit class="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          class="text-red-500 hover:text-red-700 transition"
                          @click.stop.prevent="onDeleteTask(task.id)"
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

    <!-- Modals -->
    <PhaseModal ref="phaseModal" @success="handleSuccess" />
    <TaskModal ref="taskModal" @success="handleSuccess" />
  </PageStateWrapper>
</template>

<script setup>
import { Edit, Eye, Plus, RefreshCw, TrashIcon } from 'lucide-vue-next';
import VExpansionPanels from '@/components/ui/VExpansionPanels.vue';
import VExpansionPanel from '@/components/ui/VExpansionPanel.vue';
import { useActionStore, useActionPhaseStore, useTaskStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import PhaseModal from './components/PhaseModal.vue';
import TaskModal from './components/TaskModal.vue';

const expanded = ref(0);
const phaseModal = ref(null);
const taskModal = ref(null);

const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const route = useRoute();
const { t } = useI18n();
const actionStore = useActionStore();
const phaseStore = useActionPhaseStore();
const taskStore = useTaskStore();

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await phaseStore.getAll(route.params.id);
});

const backRoute = computed(() => ({ name: 'action' }));

const openCreateModal = () => phaseModal.value.openCreateModal();
const openEditModal = (id) => phaseModal.value.openEditModal(id);

const openCreateTaskModal = (phaseId) => taskModal.value.openCreateModal(phaseId);
const openEditTaskModal = (taskId) => taskModal.value.openEditModal(taskId);
const openViewTaskModal = (taskId) => taskModal.value.openViewModal(taskId);

const handleSuccess = async (result) => {
  await phaseStore.getAll(route.params.id);

  const newPhaseUuid = result?.action_phase?.uuid;
  if (newPhaseUuid) {
    const newIndex = phaseStore.phases.findIndex((p) => p.uuid === newPhaseUuid);
    if (newIndex !== -1) {
      expanded.value = newIndex;
    }
  } else {
    expanded.value = expanded.value ?? 0;
  }

  showSimpleAlerte({ icon: 'success', text: result.message });
};

const toggleTask = async (task) => {
  try {
    const result = await taskStore.toggle(task.id);
    task.is_completed = result.task.is_completed;
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (_) {}
};

const handleUseDefaultPhases = async () => {
  const confirm = await showConfirm({
    message: t('common.sweetalert.actionPhase.confirmUseDefaultPhases'),
    confirmButtonText: t('common.sweetalert.actionPhase.confirmButtonText')
  });

  if (confirm.isConfirmed) {
    try {
      const result = await phaseStore.initializeDefaultPhases(route.params.id);
      showSimpleAlerte({
        icon: 'success',
        text: result.message,
      });

      await phaseStore.getAll(route.params.id);
      expanded.value = 0;
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

const onDeletePhase = async (id) => {
  const confirm = await showConfirm({
    message: t('common.sweetalert.actions.confirmDelete'),
  });
  if (confirm.isConfirmed) {
    try {
      const result = await phaseStore.destroy(id);
      showSimpleAlerte({ icon: 'success', text: result.message });
      await phaseStore.getAll(route.params.id);
      expanded.value = 0;
    } catch (error) {
      showErrorModal({
        title: t('common.errors.serverErrorTitle'),
        message: error.response?.data?.message ?? t('common.errors.defaultErrorMessage'),
      });
    }
  }
};

const onDeleteTask = async (taskId) => {
  const confirm = await showConfirm({
    message: t('common.sweetalert.actions.confirmDelete'),
  });
  if (confirm.isConfirmed) {
    try {
      const result = await taskStore.destroy(taskId);
      showSimpleAlerte({ icon: 'success', text: result.message });
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
