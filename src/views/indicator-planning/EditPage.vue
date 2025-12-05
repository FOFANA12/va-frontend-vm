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
          customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
        >
          {{ t('indicator.btnList') }}
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

import { useIndicatorPlanningStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const store = useIndicatorPlanningStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;

store.resetForm();
alertStore.resetMessage();

const backRoute = computed(() => {
  return { name: 'indicator' };
});

const showRoute = computed(() => {
  return {
    name: route.name.replace(/-edit$/, '-show'),
    params: { id: route.params.id },
  };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await Promise.all([store.requirements(), store.find(route.params.id, 'edit')]);
});

const onSubmit = async () => {
  alertStore.resetMessage();

  try {
    const result = await store.update(route.params.id);
    store.form.is_planned = true;
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (error) {
    const errors = error.errors || {};

    const firstPlanningError = Object.keys(errors).find((key) => key.startsWith('periods'));

    if (firstPlanningError) {
      const message = errors[firstPlanningError][0];
      alertStore.updateMessage('danger', message);
    }
  }
};

onMounted(async () => {
  await fetchWithState();
});
</script>
    