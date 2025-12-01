<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs
        :breadcrumbs="route.meta.breadcrumbs"
        :pageTitle="t('settings.defaultPhase.breadTitle')"
      />

      <!-- Phase buttons -->
      <div class="flex justify-end mt-4 mb-4 gap-4">
        <Button
          v-if="hasPermission(PERMISSIONS.CREATE_DEFAULT_PHASE)"
          :icon="Plus"
          variant="primary"
          customClass="sm:px-4"
          @click="openCreateModal"
        >
          {{ t('settings.defaultPhase.btnAdd') }}
        </Button>
      </div>

      <!-- No phase yet -->
      <div class="w-full mx-auto bg-white rounded-lg" v-if="phaseStore.phases.length === 0">
        <div class="card-body p-4">
          <div class="flex flex-col items-center justify-center py-6 text-center">
            <p class="text-lg text-red-600">
              {{ t('settings.defaultPhase.noPhaseYet') }}
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
                {{ t('settings.defaultPhase.panelTitle', { num: phase.number }) }}
              </h2>

              <div class="flex items-center gap-4 mr-4">
                <button
                  v-if="hasPermission(PERMISSIONS.UPDATE_DEFAULT_PHASE)"
                  type="button"
                  class="text-primary-500 hover:text-primary-800 transition-colors"
                  @click.stop.prevent="openEditModal(phase.id)"
                >
                  <Edit class="w-5 h-5" />
                </button>
                <button
                  v-if="hasPermission(PERMISSIONS.DELETE_DEFAULT_PHASE)"
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
                        :label="t('settings.defaultPhase.form.number')"
                        :model-value="phase.number"
                      />
                    </div>

                    <!-- Name -->
                    <div class="col-span-12 md:col-span-4">
                      <InputReadonly
                        id="name"
                        name="name"
                        :label="t('settings.defaultPhase.form.name')"
                        :model-value="phase.name"
                      />
                    </div>

                    <!-- Duration -->
                    <div class="col-span-12 md:col-span-4">
                      <InputReadonly
                        id="duration"
                        name="duration"
                        :label="t('settings.defaultPhase.form.duration')"
                        :model-value="phase.duration"
                      />
                    </div>

                    <!-- Weight -->
                    <div class="col-span-12 md:col-span-4">
                      <InputReadonly
                        id="weight"
                        name="weight"
                        :label="t('settings.defaultPhase.form.weight')"
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
            </div>
          </template>
        </VExpansionPanel>
      </VExpansionPanels>

      <!-- Modal -->
      <PhaseModal ref="phaseModal" @success="handleSuccess" />
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import { Edit, Eye, Plus, TrashIcon } from 'lucide-vue-next';
import VExpansionPanels from '@/components/ui/VExpansionPanels.vue';
import VExpansionPanel from '@/components/ui/VExpansionPanel.vue';
import { useDefaultPhaseStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import PhaseModal from './components/PhaseModal.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const expanded = ref(0);
const phaseModal = ref(null);

const { showConfirm, showSimpleAlerte, showErrorModal } = useSwalAlerte();
const route = useRoute();
const { t } = useI18n();
const phaseStore = useDefaultPhaseStore();

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

onMounted(async () => {
  await fetchWithState();
  expanded.value = 0;
});
</script>
