<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4 gap-4">
        <LinkButton
          :to="backRoute"
          variant="secondary"
          customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
        >
          {{ t('contract.btnList') }}
        </LinkButton>

        <LinkButton :to="showRoute" variant="primary" class="min-w-[100px]">
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
        <Form context="edit" />
      </div>
    </form>
  </PageStateWrapper>
</template>
    
<script setup>
import { Eye, Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useContractStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const store = useContractStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;
store.resetForm();

const supplierId = computed(() => route.params.id);

const backRoute = computed(() => ({
  name: route.name.replace(/-contract-(create|edit|show)$/, '-contract'),
  params: {
    id: supplierId.value,
  },
}));

const showRoute = computed(() => ({
  name: route.name.replace(/-edit$/, '-show'),
  params: {
    id: supplierId.value,
    contractId: form.id,
  },
}));

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await Promise.all([store.find(route.params.contractId, 'edit')]);
});

const onSubmit = async () => {
  try {
    const result = await store.update(form.id);
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (_error) {}
};

onMounted(async () => {
  await fetchWithState();
});
</script>
    