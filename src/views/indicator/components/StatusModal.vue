<template>
  <CustomModal size="sm" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
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
              :options="indicatorStore.statuses"
              :label="t(`common.entityStatus.${context}.label`)"
              :placeholder="t(`common.entityStatus.${context}.placeholder`)"
              :error="errors.status"
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
import { useIndicatorStore } from '@/store';
const indicatorStore = useIndicatorStore();

const emit = defineEmits(['success']);
const context = 'indicator';
const isModalOpen = ref(false);

const form = reactive({
  id: null,
  status: null,
});
const errors = reactive({
  status: null,
});

const closeModal = () => {
  isModalOpen.value = false;
};

const resetForm = () => {
  form.id = null;
  form.status = null;
  errors.status = null;
};

const onSubmit = async () => {
  errors.status = null;

  try {
    const payload = { status: form.status };
    const result = await indicatorStore.updateStatus(form.id, payload);

    onSuccess(result);
  } catch (error) {
    if (error?.errors) {
      statusErrors.status = error.errors.status || null;
    }
    onError(error);
  }
};

const onSuccess = (result) => {
  resetForm();
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

const openStatusModal = async (indicatorId, currentStatus) => {
  resetForm();
  form.id = indicatorId;
  form.status = currentStatus.code;

  try {
    if (!indicatorStore.statuses.length) {
      await indicatorStore.getStatuses();
    }

    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open edit modal:', err);
  }
};

defineExpose({ openStatusModal });
</script>
