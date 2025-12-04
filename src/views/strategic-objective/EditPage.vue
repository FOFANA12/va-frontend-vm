<template>
  <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'strategicObjective' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('strategicObjective.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.READ_STRATEGIC_OBJECTIVES)"
        :to="{ name: 'strategicObjective-show', params: { id: route.params.id } }"
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

import { useStrategicObjectiveStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import StatusModal from './components/StatusModal.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const route = useRoute();
const store = useStrategicObjectiveStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;

const statusModalRef = ref();

const openStatusModal = (actionId, currentStatus) => {
  statusModalRef.value?.openStatusModal(actionId, currentStatus);
};

const handleSuccess = (result) => {
  showSimpleAlerte({ icon: 'success', text: result.message });
};

const onSubmit = async () => {
  try {
    const result = await store.update(form.id);
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (_error) {}
};
</script>
    