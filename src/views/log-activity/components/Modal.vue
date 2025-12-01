<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="structure"
              name="structure"
              :label="t('actionPlan.form.structure')"
              :placeholder="t('actionPlan.form.structurePlaceholder')"
              :modelValue="form.structure"
              readonly
            />
            <SingleSelect
              v-else
              id="structure"
              name="structure"
              v-model="form.structure"
              :label="t('actionPlan.form.structure')"
              :options="requirements.structures"
              :placeholder="t('actionPlan.form.structurePlaceholder')"
              :error="form.errors.get('structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Responsible -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="responsible"
              name="responsible"
              :label="t('actionPlan.form.responsible')"
              :placeholder="t('actionPlan.form.responsiblePlaceholder')"
              :modelValue="form.responsible"
              readonly
            />

            <SingleSelect
              v-else
              id="responsible"
              name="responsible"
              v-model="form.responsible"
              :label="t('actionPlan.form.responsible')"
              :options="requirements.users"
              :placeholder="t('actionPlan.form.responsiblePlaceholder')"
              :error="form.errors.get('responsible')"
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

          <!-- Reference (View Only) -->
          <div v-if="context !== 'create'" class="col-span-12 md:col-span-6">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('actionPlan.form.reference')"
              :placeholder="t('actionPlan.form.reference')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="name"
              name="name"
              :label="t('actionPlan.form.name')"
              :placeholder="t('actionPlan.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
            <Input
              v-else
              id="name"
              name="name"
              v-model="form.name"
              :label="t('actionPlan.form.name')"
              :placeholder="t('actionPlan.form.namePlaceholder')"
              :error="form.errors.get('name')"
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
              :label="t('actionPlan.form.startDate')"
              :placeholder="t('actionPlan.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
            <Input
              v-else
              id="start_date"
              name="start_date"
              type="date"
              v-model="form.start_date"
              :label="t('actionPlan.form.startDate')"
              :placeholder="t('actionPlan.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              :form="form"
            />
          </div>

          <!-- End Date -->
          <div class="col-span-12 md:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="end_date"
              name="end_date"
              type="text"
              :label="t('actionPlan.form.endDate')"
              :placeholder="t('actionPlan.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
            <Input
              v-else
              id="end_date"
              name="end_date"
              type="date"
              v-model="form.end_date"
              :label="t('actionPlan.form.endDate')"
              :placeholder="t('actionPlan.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              :form="form"
            />
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <TextareaReadonly
              v-if="isReadOnly"
              id="description"
              name="description"
              :label="t('actionPlan.form.description')"
              :placeholder="t('actionPlan.form.descriptionPlaceholder')"
              :modelValue="form.description"
              readonly
              :rows="3"
            />
            <Textarea
              v-else
              id="description"
              name="description"
              v-model="form.description"
              :label="t('actionPlan.form.description')"
              :placeholder="t('actionPlan.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :form="form"
              :rows="3"
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 flex items-center">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              :disabled="isReadOnly"
              class="checkbox-primary h-5 w-5 mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
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
import { useI18n } from 'vue-i18n';
import { useActionPlanStore } from '@/store';
const store = useActionPlanStore();
const { t } = useI18n();
const emit = defineEmits(['success']);

const form = store.form;
const isModalOpen = ref(false);
const context = ref('create');
const requirements = ref({ structures: [], users: [] });

const isReadOnly = computed(() => context.value === 'view');
const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('actionPlan.modalTitleCreation');
    case 'edit':
      return t('actionPlan.modalTitleModification');
    case 'view':
    default:
      return t('actionPlan.modalTitleOverview');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  closeModal();
  try {
    const result = context.value === 'create' ? await store.create() : await store.update(form.id);
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

const loadRequirements = async () => {
  try {
    const result = await store.requirements();
    requirements.value = result;
  } catch (err) {
    console.error('Error loading requirements:', err);
  }
};

const openCreateModal = async () => {
  context.value = 'create';
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
