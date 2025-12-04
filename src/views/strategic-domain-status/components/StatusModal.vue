<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ t(`common.entityStatus.${context}.modalTitle`) }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12">
            <SingleSelect
              id="status"
              name="status"
              v-model="form.status"
              :options="requirements.statuses"
              :label="t(`common.entityStatus.${context}.label`)"
              :placeholder="t(`common.entityStatus.${context}.placeholder`)"
              :error="form.errors.get('status')"
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
import { useStrategicDomainStatusStore,  useStrategicDomainStore} from '@/store';
const strategicDomainStatusStore = useStrategicDomainStatusStore();
const strategicDomainStore = useStrategicDomainStore();
const requirements = ref({ statuses: [] });

const emit = defineEmits(['success']);
const context = 'strategicDomain';
const isModalOpen = ref(false);
const currentStrategicDomainId = ref(null);

const form = strategicDomainStatusStore.form;

const closeModal = () => {
  isModalOpen.value = false;
  strategicDomainStatusStore.resetForm();
};

const onSubmit = async () => {
  try {
    const result = await strategicDomainStatusStore.create(currentStrategicDomainId.value);
    
    strategicDomainStore.form.status = result.status.status;
    strategicDomainStore.form.status_changed_at = result.status.status_date;
    strategicDomainStore.form.status_changed_by = result.status.author;

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

const loadRequirements = async (strategicDomainId) => {
  try {
    const result = await strategicDomainStatusStore.requirements(strategicDomainId);
    requirements.value = result;
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
};

const openStatusModal = async (strategicDomainId) => {
  currentStrategicDomainId.value = strategicDomainId;
  strategicDomainStatusStore.resetForm();

  try {
    await loadRequirements(strategicDomainId);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open modal:', err);
  }
};

defineExpose({ openStatusModal });
</script>
