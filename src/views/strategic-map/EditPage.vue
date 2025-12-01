<template>
  <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>

      <LinkButton
        :to="{ name: 'action-show', params: { id: route.params.id } }"
        variant="primary"
        class="min-w-[100px]"
      >
        <Eye class="w-5 h-5 mr-2" />
        {{ t('common.view') }}
      </LinkButton>

      <SubmitButton
        :busy="form.busy"
        customClass="min-w-[100px] bg-primary-500 px-3 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
      >
        <template #default>
          <Save class="w-5 h-5 mr-2" />
          {{ t('common.buttons.save') }}
        </template>

        <template #loading>
          <Save class="w-5 h-5 mr-2" />
          {{ t('common.buttons.processing') }}
        </template>
      </SubmitButton>
    </div>

    <div class="mt-6">
      <Form context="edit" @open-status-modal="openStatusModal" />
    </div>
  </form>
  <StatusModal ref="statusModalRef" @success="handleSuccess" />
</template>
    
<script setup>
import { Eye, Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';
import StatusModal from './components/StatusModal.vue';
import { useActionStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

const route = useRoute();
const store = useActionStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;
alertStore.resetMessage();

const statusModalRef = ref();

const openStatusModal = (actionId, currentStatus) => {
  statusModalRef.value?.openStatusModal(actionId, currentStatus);
};

const handleSuccess = (result) => {
  showSimpleAlerte({ icon: 'success', text: result.message });
};

const onSubmit = async () => {
  alertStore.resetMessage();

  try {
    const result = await store.update(form.id);
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (error) {
    const errors = error.errors || {};

    const firstBudgetLineError = Object.keys(errors).find((key) =>
      key.startsWith('funding_sources')
    );

    if (firstBudgetLineError) {
      console.log('error');
      const message = errors[firstBudgetLineError][0];
      alertStore.updateMessage('danger', message);
    }
  }
};
</script>
    