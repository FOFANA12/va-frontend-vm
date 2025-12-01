<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ t(`common.entityState.${context}.modalTitle`) }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <SingleSelect
              id="state"
              name="state"
              v-model="form.state"
              :options="requirements.states"
              :label="t(`common.entityState.${context}.label`)"
              :placeholder="t(`common.entityState.${context}.placeholder`)"
              :error="form.errors.get('state')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="code"
              label-key="name"
              clearable
              required
            />
          </div>
        </div>
      </form>
    </template>

    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.close') }}
        </Button>

        <Button
          variant="primary"
          customClass="min-w-[100px] bg-primary-500 text-white px-3 rounded-lg hover:bg-primary-600 transition-all flex justify-center"
          @click="onSubmit"
          type="submit"
        >
          {{ t('common.modal.buttons.save') }}
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<script setup>
import { useProjectStateStore,  useProjectStore} from '@/store';
const projectStateStore = useProjectStateStore();
const projectStore = useProjectStore();
const requirements = ref({ statuses: [] });

const emit = defineEmits(['success']);
const context = 'project';
const isModalOpen = ref(false);
const currentProjectId = ref(null);

const form = projectStateStore.form;

const closeModal = () => {
  isModalOpen.value = false;
  projectStateStore.resetForm();
};

const onSubmit = async () => {
  try {
    const result = await projectStateStore.create(currentProjectId.value);
    
    projectStore.form.state = result.state.state;
    projectStore.form.state_changed_at = result.state.state_date;
    projectStore.form.state_changed_by = result.state.author;

    onSuccess(result);
  } catch (error) {
    onError(error);
  }
};

const onSuccess = (result) => {
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

const loadRequirements = async (projectId) => {
  try {
    const result = await projectStateStore.requirements(projectId);
    requirements.value = result;
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
};

const openStateModal = async (projectId) => {
  currentProjectId.value = projectId;
  projectStateStore.resetForm();

  try {
    await loadRequirements(projectId);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open modal:', err);
  }
};

defineExpose({ openStateModal });
</script>
