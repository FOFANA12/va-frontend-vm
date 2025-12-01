<template>
  <CustomModal size="xl" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-12 gap-6 py-6">
          <!-- Title -->
          <div class="col-span-12 md:col-span-6">
            <Input
              id="title"
              name="title"
              v-model="form.title"
              :label="t('attachment.form.title')"
              :placeholder="t('attachment.form.titlePlaceholder')"
              :error="form.errors.get('title')"
              :form="form"
              required
            />
          </div>

          <div class="col-span-12 md:col-span-6" v-if="form.attachable_type === 'actions'">
            <SingleSelect
              id="file_type"
              name="file_type"
              v-model="form.file_type"
              :options="requirements.fileTypes"
              :label="t('attachment.form.fileType')"
              :placeholder="t('attachment.form.fileTypePlaceholder')"
              :error="form.errors.get('file_type')"
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

          <!-- File Upload -->
          <div class="col-span-12 md:col-span-6">
            <!-- Label -->
            <label
              for="file"
              class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              {{ t('attachment.form.file') }}
              <span class="text-red-500">*</span>
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

          <div class="col-span-12">
            <Textarea
              id="comment"
              name="comment"
              v-model="form.comment"
              :label="t('attachment.form.comment')"
              :placeholder="t('attachment.form.commentPlaceholder')"
              :error="form.errors.get('comment')"
              :form="form"
              :rows="7"
            />
          </div>
        </div>
      </form>
    </template>

    <!-- Buttons Slot -->
    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.cancel') }}
        </Button>

        <Button
          variant="primary"
          customClass="min-w-[100px] bg-primary-500 text-white px-3 rounded-lg hover:bg-primary-600 transition-all flex justify-center"
          @click="onSubmit"
          type="submit"
        >
          {{ t('attachment.btnUpload') }}
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<script setup>
import { useAttachmentStore } from '@/store';
import { Upload, X } from 'lucide-vue-next';
const emit = defineEmits(['success']);

const attachementStore = useAttachmentStore();
const requirements = ref({ fileTypes: [] });

const { t } = useI18n();

const form = attachementStore.form;
const isModalOpen = ref(false);
const fileInput = ref(null);

const onChangeFile = (event) => {
  const file = event.target.files[0];
  form.file = file;
};

const triggerFileSelection = () => {
  fileInput.value.click();
};

const clearFile = () => {
  form.file = null;
};

const modalTitle = computed(() => t('attachment.modalUploadTitle'));

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  form.clear();
  closeModal();
  try {
    const result = await attachementStore.upload();
    onSuccess(result);
  } catch (error) {
    onError(error);
  }
};

const onSuccess = (result) => {
  attachementStore.resetForm();
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

const openModal = async (attachableType, attachableId) => {
  attachementStore.resetForm();
  form.attachable_type = attachableType;
  form.attachable_id = attachableId;

  if (attachableType === 'actions') {
    try {
      const result = await attachementStore.requirements();
      requirements.value.fileTypes = result.file_types || [];
    } catch (err) {
      requirements.value.fileTypes = [];
    }
  }

  isModalOpen.value = true;
};

defineExpose({ openModal });
</script>
