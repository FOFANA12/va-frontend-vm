<template>
  <CustomModal size="md" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Name -->
          <div class="col-span-12">
            <InputReadonly
              v-if="isReadOnly"
              id="name"
              name="name"
              :label="t('settings.fileType.form.name')"
              :placeholder="t('settings.fileType.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
            <Input
              v-else
              id="name"
              name="name"
              v-model="form.name"
              :label="t('settings.fileType.form.name')"
              :placeholder="t('settings.fileType.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <div class="col-span-12" v-if="context !== 'create'">
            <div class="w-full mx-auto bg-white rounded-lg mb-6">
              <label class="mb-2 block text-sm font-medium text-gray-700">
                {{ t('attachment.form.attachedFile') }}
              </label>

              <div
                class="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                v-if="form.download_url && form.original_name && !form.file"
              >
                <div class="flex items-center gap-2">
                  <FileText class="w-5 h-5 text-primary-500" />
                  <a
                    :href="form.download_url"
                    target="_blank"
                    class="text-primary-600 hover:underline truncate max-w-[500px]"
                  >
                    {{ form.original_name }}
                  </a>
                </div>

                <button
                  v-if="context !== 'view'"
                  type="button"
                  @click.prevent.stop="clearFile"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>

              <div v-else class="p-3 border rounded-lg bg-gray-50 text-red-500 text-sm font-medium">
                {{ t('attachment.form.noFile') }}
              </div>
            </div>
          </div>

          <!-- File Upload -->
          <div class="col-span-12" v-if="context !== 'view'">
            <!-- Label -->
            <label
              for="file"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              {{ t('attachment.form.file') }}
            </label>

            <!-- Input with optional icon and action -->
            <div class="relative">
              <input
                id="file"
                ref="fileInput"
                type="file"
                class="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                @change="onChangeFile"
                aria-label="Document file"
              />

              <!-- Custom trigger styled like other inputs -->
              <div
                class="w-full py-2.5 px-3 rounded-lg text-sm text-gray-800 bg-white dark:bg-transparent border cursor-pointer flex items-center justify-between border-gray-300 focus-within:border-primary-300 focus-within:ring-1 focus-within:ring-primary-500/10"
                @click="triggerFileSelection"
              >
                <span class="truncate text-gray-500">
                  {{ form.file ? form.file.name : t('attachment.form.filePlaceholder') }}
                </span>

                <Upload v-if="!form.file" class="w-5 h-5 text-gray-400" />

                <button
                  type="button"
                  v-if="form.file"
                  @click.prevent.stop="clearFile"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Clear Document File"
                >
                  <X class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Error message -->
            <p v-if="form.errors.get('file')" class="text-red-500 text-xs mt-1">
              {{ form.errors.get('file') }}
            </p>
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
import { useSettingsFileTypeStore } from '@/store';
import { FileText, Upload, X } from 'lucide-vue-next';
const store = useSettingsFileTypeStore();
const { t } = useI18n();
const emit = defineEmits(['success']);

const form = store.form;
const fileInput = ref(null);
const isModalOpen = ref(false);
const context = ref('create');

const isReadOnly = computed(() => context.value === 'view');
const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('settings.fileType.modalTitleCreation');
    case 'edit':
      return t('settings.fileType.modalTitleModification');
    case 'view':
    default:
      return t('settings.fileType.modalTitleOverview');
  }
});

const onChangeFile = (event) => {
  form.file = event.target.files[0];
  form.delete_file = false;
};

const triggerFileSelection = () => {
  fileInput.value.click();
};

const clearFile = () => {
  form.file = null;
  form.download_url = null;
  form.delete_file = true;
};

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

const openCreateModal = async () => {
  context.value = 'create';
  store.resetForm();
  isModalOpen.value = true;
};

const openEditModal = async (id) => {
  context.value = 'edit';
  store.resetForm();
  form.delete_file = false;

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
