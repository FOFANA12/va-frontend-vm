<template>
  <div class="flex justify-end mt-4 gap-4">
    <LinkButton
      :to="{ name: 'strategicObjective' }"
      variant="secondary"
      customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
    >
      {{ t('strategicObjective.btnList') }}
    </LinkButton>

    <LinkButton
      :to="{ name: 'strategicObjective-edit', params: { id: route.params.id } }"
      variant="primary"
      class="min-w-[100px]"
    >
      <Edit class="w-5 h-5 mr-2" />
      {{ t('common.edit') }}
    </LinkButton>

    <LinkButton :to="{ name: 'strategicObjective-create' }" variant="primary" class="min-w-[100px]">
      <Plus class="w-5 h-5 mr-2" />
      {{ t('strategicObjective.btnAdd') }}
    </LinkButton>
  </div>

  <div class="mt-6">
    <Form @open-status-modal="openStatusModal" />
  </div>
  <StatusModal ref="statusModalRef" @success="handleSuccess" />
</template>
      
  <script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import StatusModal from './components/StatusModal.vue';

const statusModalRef = ref();
const route = useRoute();
const { showSimpleAlerte } = useSwalAlerte();

const openStatusModal = (objectiveId, currentStatus) => {
  statusModalRef.value?.openStatusModal(objectiveId, currentStatus);
};

const handleSuccess = (result) => {
  showSimpleAlerte({ icon: 'success', text: result.message });
};
</script>
      