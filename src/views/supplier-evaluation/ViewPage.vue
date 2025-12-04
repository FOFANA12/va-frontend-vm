<template>
  <PageStateWrapper
    :isLoading="isLoading"
    :hasError="hasError"
    :errorMessage="errorMessage"
    :onRetry="fetchWithState"
  >
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="backRoute"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('supplierEvaluation.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.SUP_MANAGE_EVALUATIONS)"
        :to="editRoute"
        variant="primary"
        class="min-w-[100px]"
      >
        <Edit class="w-5 h-5 mr-2" />
        {{ t('common.edit') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.SUP_MANAGE_EVALUATIONS)"
        :to="createRoute"
        variant="primary"
        class="min-w-[100px]"
      >
        <Plus class="w-5 h-5 mr-2" />
        {{ t('supplierEvaluation.btnAdd') }}
      </LinkButton>
    </div>

    <div class="mt-6">
      <Form context="view" />
    </div>
  </PageStateWrapper>
</template>

<script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';

import { useSupplierEvaluationStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const route = useRoute();
const store = useSupplierEvaluationStore();
store.resetForm();

const supplierId = computed(() => route.params.id);

const backRoute = computed(() => ({
  name: route.name.replace(/-show$/, ''),
  params: {
    id: supplierId.value,
  },
}));

const editRoute = computed(() => ({
  name: route.name.replace(/-show$/, '-edit'),
  params: {
    id: supplierId.value,
    supplierEvaluationId: route.params.supplierEvaluationId,
  },
}));

const createRoute = computed(() => ({
  name: route.name.replace(/-show$/, '-create'),
  params: {
    id: supplierId.value,
  },
}));

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.supplierEvaluationId, 'view'));

onMounted(async () => {
  await fetchWithState();
});
</script>
