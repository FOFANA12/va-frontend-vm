<template>
  <CustomModal size="xl" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <!-- Title -->
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <!-- Body -->
    <template #body>
      <div class="grid grid-cols-12 gap-6">
        <!-- Title -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="title"
            name="title"
            :label="t('attachment.form.title')"
            :placeholder="t('attachment.form.titlePlaceholder')"
            :modelValue="form.title"
            readonly
          />
        </div>

        <!-- Original name -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="original_name"
            name="original_name"
            :label="t('attachment.form.originalName')"
            :placeholder="t('attachment.form.originalNamePlaceholder')"
            :modelValue="form.original_name"
            readonly
          />
        </div>

        <!-- File type -->
        <div class="col-span-12 md:col-span-6" v-if="form.file_type">
          <InputReadonly
            id="file_type"
            name="file_type"
            :label="t('attachment.form.fileType')"
            :placeholder="t('attachment.form.fileTypePlaceholder')"
            :modelValue="form.file_type"
            readonly
          />
        </div>

        <!-- Mime type -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="mime_type"
            name="mime_type"
            :label="t('attachment.form.mimeType')"
            :placeholder="t('attachment.form.mimeTypePlaceholder')"
            :modelValue="form.mime_type"
            readonly
          />
        </div>

        <!-- Size -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="size"
            name="size"
            :label="t('attachment.form.size')"
            :placeholder="t('attachment.form.sizePlaceholder')"
            :modelValue="`${(form.size / 1024).toFixed(2)} KB`"
            readonly
          />
        </div>

        <!-- Uploaded at -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="uploaded_at"
            name="uploaded_at"
            :label="t('attachment.form.uploadedAt')"
            :placeholder="t('attachment.form.uploadedAtPlaceholder')"
            :modelValue="form.uploaded_at"
            readonly
          />
        </div>

        <!-- Uploaded by -->
        <div class="col-span-12 md:col-span-6">
          <InputReadonly
            id="uploaded_by"
            name="uploaded_by"
            :label="t('attachment.form.uploadedBy')"
            :placeholder="t('attachment.form.uploadedByPlaceholder')"
            :modelValue="form.uploaded_by"
            readonly
          />
        </div>
      </div>

      <div class="col-span-12">
        <!-- Download link -->
        <div v-if="form.download_url" class="mt-4">
          <a
            :href="form.download_url"
            target="_blank"
            class="inline-flex items-center text-blue-400 hover:underline"
          >
            <i class="fa fa-download mr-2"></i>
            {{ t('attachment.form.downloadFile') }}
          </a>
        </div>
      </div>

      <div class="col-span-12 mt-4">
        <TextareaReadonly
          id="comment"
          name="comment"
          :label="t('attachment.form.comment')"
          :placeholder="t('attachment.form.commentPlaceholder')"
          :modelValue="form.comment"
          readonly
          :rows="7"
        />
      </div>
    </template>

    <!-- Buttons -->
    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
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
import { useAttachmentStore } from '@/store';

const store = useAttachmentStore();
const { t } = useI18n();

const form = store.form;
const isModalOpen = ref(false);

const modalTitle = computed(() => t('attachment.modalViewTitle'));

const closeModal = () => {
  isModalOpen.value = false;
};

const openModal = async (id) => {
  store.resetForm();
  try {
    await store.find(id);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open view modal:', err);
  }
};

defineExpose({ openModal });
</script>
