<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Organization -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="organization"
              name="organization"
              :label="t('strategicStakeholder.form.organization')"
              :placeholder="t('strategicStakeholder.form.organizationPlaceholder')"
              :modelValue="form.organization"
              readonly
            />
            <Input
              v-else
              id="organization"
              name="organization"
              v-model="form.organization"
              :label="t('strategicStakeholder.form.organization')"
              :placeholder="t('strategicStakeholder.form.organizationPlaceholder')"
              :error="form.errors.get('organization')"
              :form="form"
              required
            />
          </div>

          <!-- Responsible -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="responsible"
              name="responsible"
              :label="t('strategicStakeholder.form.responsible')"
              :placeholder="t('strategicStakeholder.form.responsiblePlaceholder')"
              :modelValue="form.responsible"
              readonly
            />
            <Input
              v-else
              id="responsible"
              name="responsible"
              v-model="form.responsible"
              :label="t('strategicStakeholder.form.responsible')"
              :placeholder="t('strategicStakeholder.form.responsiblePlaceholder')"
              :error="form.errors.get('responsible')"
              :form="form"
              required
            />
          </div>

          <!-- Email -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="email"
              name="email"
              :label="t('strategicStakeholder.form.email')"
              :placeholder="t('strategicStakeholder.form.emailPlaceholder')"
              :modelValue="form.email"
              readonly
            />
            <Input
              v-else
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              :label="t('strategicStakeholder.form.email')"
              :placeholder="t('strategicStakeholder.form.emailPlaceholder')"
              :error="form.errors.get('email')"
              :form="form"
              required
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="phone"
              name="phone"
              :label="t('strategicStakeholder.form.phone')"
              :placeholder="t('strategicStakeholder.form.phonePlaceholder')"
              :modelValue="form.phone"
              readonly
            />
            <Input
              v-else
              id="phone"
              name="phone"
              v-model="form.phone"
              :label="t('strategicStakeholder.form.phone')"
              :placeholder="t('strategicStakeholder.form.phonePlaceholder')"
              :error="form.errors.get('phone')"
              :form="form"
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
import { useStrategicStakeholderStore } from '@/store';
const store = useStrategicStakeholderStore();
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
      return t('strategicStakeholder.modalTitleCreation');
    case 'edit':
      return t('strategicStakeholder.modalTitleModification');
    case 'view':
    default:
      return t('strategicStakeholder.modalTitleOverview');
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
