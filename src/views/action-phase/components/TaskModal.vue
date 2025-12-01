<template>
  <CustomModal size="lg" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
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

      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-12 gap-6">
          <!-- Title -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="title"
              name="title"
              :label="t('task.form.title')"
              :placeholder="t('task.form.titlePlaceholder')"
              :modelValue="form.title"
            />
            <Input
              v-else
              id="title"
              name="title"
              v-model="form.title"
              :label="t('task.form.title')"
              :placeholder="t('task.form.titlePlaceholder')"
              :error="form.errors.get('title')"
              :form="form"
              required
            />
          </div>

          <!-- Start Date -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="start_date"
              name="start_date"
              type="text"
              :label="t('task.form.startDate')"
              :placeholder="t('task.form.startDatePlaceholder')"
              :modelValue="form.start_date"
            />
            <DatePicker
              v-else
              id="start_date"
              name="start_date"
              v-model="form.start_date"
              :label="t('task.form.startDate')"
              :placeholder="t('task.form.startDatePlaceholder')"
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
              :label="t('task.form.endDate')"
              :placeholder="t('task.form.endDatePlaceholder')"
              :modelValue="form.end_date"
            />
            <DatePicker
              v-else
              id="end_date"
              name="end_date"
              v-model="form.end_date"
              :label="t('task.form.endDate')"
              :placeholder="t('task.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              required
            />
          </div>

          <!-- Priority -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="priority"
              name="priority"
              type="text"
              :label="t('task.form.priority')"
              :placeholder="t('task.form.priorityPlaceholder')"
              :modelValue="form.priority?.label"
            />
            <SingleSelect
              v-else
              id="priority"
              name="priority"
              v-model="form.priority"
              :label="t(`task.form.priority`)"
              :options="requirements.priorities"
              :placeholder="t(`task.form.priorityPlaceholder`)"
              :error="form.errors.get('priority')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="code"
              label-key="name"
              required
            />
          </div>

          <!-- Assigned To -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="assigned_to"
              name="assigned_to"
              :label="t('task.form.assigned_to')"
              :placeholder="t('task.form.responsiblePlaceholder')"
              :modelValue="form.assigned_to"
            />
            <SingleSelect
              v-else
              id="assigned_to"
              name="assigned_to"
              v-model="form.assigned_to"
              :label="t('task.form.assigned_to')"
              :options="requirements.users"
              :placeholder="t('task.form.responsiblePlaceholder')"
              :error="form.errors.get('assigned_to')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
            />
          </div>

          <!-- Is completed -->
          <div class="col-span-12 flex items-center">
            <input
              id="is_completed"
              type="checkbox"
              v-model="form.is_completed"
              :disabled="isReadOnly"
              class="checkbox-primary h-5 w-5 mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="is_completed" class="text-gray-700">
              {{ t('task.form.isCompleted') }}
            </label>
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              v-if="isReadOnly"
              id="description"
              name="description"
              :label="t('task.form.description')"
              :placeholder="t('task.form.descriptionPlaceholder')"
              :modelValue="form.description"
              readonly
              :rows="5"
            />
            <Textarea
              v-else
              id="description"
              name="description"
              v-model="form.description"
              :label="t('task.form.description')"
              :placeholder="t('task.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :form="form"
              :rows="5"
            />
          </div>

          <!-- Deliverable -->
          <div class="col-span-12">
            <TextareaReadonly
              v-if="isReadOnly"
              id="deliverable"
              name="deliverable"
              :label="t('task.form.deliverable')"
              :placeholder="t('task.form.deliverablePlaceholder')"
              :modelValue="form.deliverable"
              readonly
              :rows="5"
            />
            <Textarea
              v-else
              id="deliverable"
              name="deliverable"
              v-model="form.deliverable"
              :label="t('task.form.deliverable')"
              :placeholder="t('task.form.deliverablePlaceholder')"
              :error="form.errors.get('deliverable')"
              :form="form"
              :rows="5"
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
import { useTaskStore } from '@/store';
const store = useTaskStore();
const { t } = useI18n();
const route = useRoute();
const emit = defineEmits(['success']);

const form = store.form;
const phaseId = ref(null);
const isModalOpen = ref(false);
const context = ref('create');
const requirements = ref({ priorities: [], users: [] });

const isReadOnly = computed(() => context.value === 'view');

const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('task.modalTitleCreation');
    case 'edit':
      return t('task.modalTitleModification');
    case 'view':
    default:
      return t('task.modalTitleOverview');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};

const loadRequirements = async () => {
  try {
    const result = await store.requirements(route.params.id);
    requirements.value = result;
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
};

const onSubmit = async () => {
  closeModal();
  try {
    const result =
      context.value === 'create' ? await store.create(phaseId.value) : await store.update(form.id);
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

const openCreateModal = async (id) => {
  context.value = 'create';
  phaseId.value = id;
  store.resetForm();
  await loadRequirements();
  isModalOpen.value = true;
};

const openEditModal = async (id) => {
  context.value = 'edit';
  store.resetForm();

  try {
    await Promise.all([loadRequirements(), store.find(id, context.value)]);
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
