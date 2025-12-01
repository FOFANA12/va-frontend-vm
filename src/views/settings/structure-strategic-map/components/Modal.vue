<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Structure -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="structure"
              name="structure"
              :label="t('settings.structureStrategicMap.form.structure')"
              :placeholder="t('settings.structureStrategicMap.form.structurePlaceholder')"
              :modelValue="form.structure"
            />
            <SingleSelect
              v-else
              id="structure"
              name="structure"
              v-model="form.structure"
              :options="requirements.structures"
              :label="t('settings.structureStrategicMap.form.structure')"
              :placeholder="t('settings.structureStrategicMap.form.structurePlaceholder')"
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

          <!-- Name -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="name"
              name="name"
              :label="t('settings.structureStrategicMap.form.name')"
              :placeholder="t('settings.structureStrategicMap.form.namePlaceholder')"
              :modelValue="form.name"
            />
            <Input
              v-else
              id="name"
              name="name"
              v-model="form.name"
              :label="t('settings.structureStrategicMap.form.name')"
              :placeholder="t('settings.structureStrategicMap.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="description"
              name="description"
              :label="t('settings.structureStrategicMap.form.description')"
              :placeholder="t('settings.structureStrategicMap.form.descriptionPlaceholder')"
              :modelValue="form.description"
            />
            <Input
              v-else
              id="description"
              name="description"
              v-model="form.description"
              :label="t('settings.structureStrategicMap.form.description')"
              :placeholder="t('settings.structureStrategicMap.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :form="form"
            />
          </div>
          <!-- Start date -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="start_date"
              name="start_date"
              :label="t('settings.structureStrategicMap.form.startDate')"
              :placeholder="t('settings.structureStrategicMap.form.startDatePlaceholder')"
              :modelValue="form.start_date"
            />
            <Input
              v-else
              id="start_date"
              name="start_date"
              type="date"
              :label="t('settings.structureStrategicMap.form.startDate')"
              v-model="form.start_date"
              :placeholder="t('settings.structureStrategicMap.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              :form="form"
              required
            />
          </div>
          <!-- End date -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="end_date"
              name="end_date"
              :label="t('settings.structureStrategicMap.form.endDate')"
              :placeholder="t('settings.structureStrategicMap.form.endDatePlaceholder')"
              :modelValue="form.end_date"
            />
            <Input
              v-else
              id="end_date"
              name="end_date"
              type="date"
              :label="t('settings.structureStrategicMap.form.endDate')"
              v-model="form.end_date"
              :placeholder="t('settings.structureStrategicMap.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              :form="form"
              required
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
import { useSettingsStructureStrategicMapStore } from '@/store';
const store = useSettingsStructureStrategicMapStore();
const { t } = useI18n();
const emit = defineEmits(['success']);

const form = store.form;
const isModalOpen = ref(false);
const context = ref('create');
const requirements = ref({ structures: [] });

const isReadOnly = computed(() => context.value === 'view');
const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('settings.structureStrategicMap.modalTitleCreation');
    case 'edit':
      return t('settings.structureStrategicMap.modalTitleModification');
    case 'view':
    default:
      return t('settings.structureStrategicMap.modalTitleOverview');
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
