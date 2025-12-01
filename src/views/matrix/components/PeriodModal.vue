<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <Alert
        v-if="form.errors.has('invalid_date_range')"
        type="error"
        :message="form.errors.get('invalid_date_range')"
        class="my-4"
        :closable="false"
      />

      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Start Date -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="start_date"
              name="start_date"
              type="text"
              :label="t('matrixPeriod.form.startDate')"
              :placeholder="t('matrixPeriod.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
            <Input
              v-else
              id="start_date"
              name="start_date"
              type="date"
              :label="t('matrixPeriod.form.startDate')"
              v-model="form.start_date"
              :placeholder="t('matrixPeriod.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              :form="form"
              required
            />
            <DatePicker
              v-else
              id="start_date"
              name="start_date"
              v-model="form.start_date"
              :label="t('matrixPeriod.form.startDate')"
              :placeholder="t('matrixPeriod.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              required
            />
          </div>

          <!-- End Date -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="end_date"
              name="end_date"
              type="text"
              :label="t('matrixPeriod.form.endDate')"
              :placeholder="t('matrixPeriod.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
            <DatePicker
              v-else
              id="end_date"
              name="end_date"
              v-model="form.end_date"
              :label="t('matrixPeriod.form.endDate')"
              :placeholder="t('matrixPeriod.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              required
            />
          </div>
        </div>
      </form>
    </template>

    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          v-if="!isReadOnly"
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.cancel') }}
        </Button>

        <Button
          v-if="!isReadOnly"
          variant="primary"
          customClass="min-w-[100px] bg-primary-500 text-white px-3 rounded-lg hover:bg-primary-600 transition-all flex justify-center"
          @click="onSubmit"
          type="submit"
        >
          {{
            context === 'create' ? t('common.modal.buttons.create') : t('common.modal.buttons.save')
          }}
        </Button>

        <Button
          v-else
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.close') }}
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<script setup>
import { useMatrixPeriodStore } from '@/store';
const store = useMatrixPeriodStore();
const { t } = useI18n();
const emit = defineEmits(['success']);

const form = store.form;
const isModalOpen = ref(false);
const context = ref('create');

const strategicMapId = ref(null);

const isReadOnly = computed(() => context.value === 'view');
const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('matrixPeriod.modalTitleCreation');
    case 'edit':
      return t('matrixPeriod.modalTitleModification');
    case 'view':
    default:
      return t('matrixPeriod.modalTitleOverview');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  closeModal();
  try {
    const result =
      context.value === 'create'
        ? await store.create(strategicMapId.value)
        : await store.update(form.id);
    onSuccess(result);
  } catch (error) {
    onError(error);
  }
};

const onSuccess = (result) => {
  store.resetForm();
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

const openCreateModal = async (mapId) => {
  context.value = 'create';
  store.resetForm();
  strategicMapId.value = mapId;
  isModalOpen.value = true;
};

const openEditModal = async (id) => {
  context.value = 'edit';
  store.resetForm();

  try {
    await store.find(id, context.value);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open edit modal:', err);
  }
};

const openViewModal = async (id) => {
  context.value = 'view';
  store.resetForm();

  try {
    await store.find(id, context.value);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open view modal:', err);
  }
};

defineExpose({ openCreateModal, openEditModal, openViewModal });
</script>
