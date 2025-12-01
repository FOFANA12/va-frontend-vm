<template>
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'indicator' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('indicator.btnList') }}
      </LinkButton>

      <LinkButton
        :to="{ name: 'indicator-edit', params: { id: route.params.id } }"
        variant="primary"
        class="min-w-[100px]"
      >
        <Edit class="w-5 h-5 mr-2" />
        {{ t('common.edit') }}
      </LinkButton>

      <LinkButton :to="{ name: 'indicator-create' }" variant="primary" class="min-w-[100px]">
        <Plus class="w-5 h-5 mr-2" />
        {{ t('indicator.btnAdd') }}
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
import StatusModal from './components/StatusModal.vue';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { useAlertStore } from '@/store';
const { showSimpleAlerte } = useSwalAlerte();

const route = useRoute();
const alertStore = useAlertStore();
alertStore.resetMessage();

const statusModalRef = ref();

const openStatusModal = (indicatorId, currentStatus) => {
  statusModalRef.value?.openStatusModal(indicatorId, currentStatus);
};

const handleSuccess = (result) => {
  showSimpleAlerte({ icon: 'success', text: result.message });
};
</script>
      