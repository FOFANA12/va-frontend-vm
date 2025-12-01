<template>
  <CustomModal size="xl" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <Alert
          v-if="form.errors.has('action')"
          type="error"
          :message="form.errors.get('action')"
          class="my-4"
          :closable="false"
        />

        <div class="grid grid-cols-12 gap-6">
          <!-- Number -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              v-if="isReadOnly"
              id="number"
              name="number"
              :label="t('actionPhase.form.number')"
              :placeholder="t('actionPhase.form.numberPlaceholder')"
              :modelValue="form.number"
              readonly
            />
            <Input
              v-else
              id="number"
              name="number"
              v-model="form.number"
              :label="t('actionPhase.form.number')"
              :placeholder="t('actionPhase.form.numberPlaceholder')"
              :error="form.errors.get('number')"
              :form="form"
              required
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              v-if="isReadOnly"
              id="name"
              name="name"
              :label="t('actionPhase.form.name')"
              :placeholder="t('actionPhase.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
            <Input
              v-else
              id="name"
              name="name"
              v-model="form.name"
              :label="t('actionPhase.form.name')"
              :placeholder="t('actionPhase.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Start Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              v-if="isReadOnly"
              id="start_date"
              name="start_date"
              type="text"
              :label="t('actionPhase.form.startDate')"
              :placeholder="t('actionPhase.form.startDatePlaceholder')"
              :modelValue="form.start_date"
              readonly
            />
            <DatePicker
              v-else
              id="start_date"
              name="start_date"
              v-model="form.start_date"
              :label="t('actionPhase.form.startDate')"
              :placeholder="t('actionPhase.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              required
            />
          </div>

          <!-- End Date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              v-if="isReadOnly"
              id="end_date"
              name="end_date"
              type="text"
              :label="t('actionPhase.form.endDate')"
              :placeholder="t('actionPhase.form.endDatePlaceholder')"
              :modelValue="form.end_date"
              readonly
            />
            <DatePicker
              v-else
              id="end_date"
              name="end_date"
              v-model="form.end_date"
              :label="t('actionPhase.form.endDate')"
              :placeholder="t('actionPhase.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              required
            />
          </div>

          <!-- Weight -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="isReadOnly">
            <InputReadonly
              id="weight"
              name="weight"
              type="text"
              :label="t('actionPhase.form.weight')"
              :placeholder="t('actionPhase.form.weightPlaceholder')"
              :modelValue="form.weight"
              readonly
            />
          </div>

          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-else>
            <label
              for="weight"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              {{ t('actionPhase.form.weight') }}
              <span class="required-star">*</span>
            </label>
            <select
              id="weight"
              name="weight"
              v-model="form.weight"
              :class="[
                'w-full py-2.5 px-3 rounded-lg text-sm text-gray-800 bg-white dark:bg-transparent border focus:outline-none',
                form.errors.get('weight')
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                  : 'border-gray-300 focus:border-primary-300 focus:ring-primary-500/10',
              ]"
            >
              >
              <option value="" disabled selected>
                {{ t('actionPhase.form.weightCoefficientPlaceholder') }}
              </option>
              <option
                v-for="option in weightCoefficientOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <p v-if="form.errors.get('weight')" class="text-red-500 text-xs mt-1">
              {{ form.errors.get('weight') }}
            </p>
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
import { useActionPhaseStore } from '@/store';
const store = useActionPhaseStore();
const { t } = useI18n();
const emit = defineEmits(['success']);

const requirements = ref({ weight_coefficients: [] });
const form = store.form;
const isModalOpen = ref(false);
const context = ref('create');
const route = useRoute();

const weightCoefficientOptions = computed(() => {
  return requirements.value.weight_coefficients ?? [];
});

const isReadOnly = computed(() => context.value === 'view');
const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('actionPhase.modalTitleCreation');
    case 'edit':
      return t('actionPhase.modalTitleModification');
    case 'view':
    default:
      return t('actionPhase.modalTitleOverview');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  const actionId = route.params.id;
  closeModal();
  try {
    const result =
      context.value === 'create'
        ? await store.create(actionId)
        : await store.update(actionId, form.id);
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

defineExpose({ openCreateModal, openEditModal });
</script>
