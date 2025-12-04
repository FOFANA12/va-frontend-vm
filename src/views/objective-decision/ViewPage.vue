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
        {{ t('decision.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.OBJ_MANAGE_DECISIONS)"
        :to="editRoute"
        variant="primary"
        class="min-w-[100px]"
      >
        <Edit class="w-5 h-5 mr-2" />
        {{ t('common.edit') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.OBJ_MANAGE_DECISIONS)"
        :to="createRoute"
        variant="primary"
        class="min-w-[100px]"
      >
        <Plus class="w-5 h-5 mr-2" />
        {{ t('decision.btnAdd') }}
      </LinkButton>
    </div>

    <div class="mt-6">
      <Form />
    </div>

    <div class="mt-6">
      <DecisionStatus @refresh-decision="fetchWithState" />
    </div>
  </PageStateWrapper>
</template>

<script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';
import DecisionStatus from '@/views/decision-status/DecisionStatus.vue';

import { useDecisionStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const route = useRoute();
const store = useDecisionStore();
store.resetForm();

const backRoute = computed(() => {
  return { name: route.name.replace(/-show$/, ''), params: { id: route.params.id } };
});

const editRoute = computed(() => {
  return {
    name: route.name.replace(/-show$/, '-edit'),
    params: { id: route.params.id },
  };
});

const createRoute = computed(() => {
  return {
    name: route.name.replace(/-show$/, '-create'),
    params: { id: route.params.id },
  };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.decisionId, 'view'));

onMounted(async () => {
  await fetchWithState();
});
</script>
