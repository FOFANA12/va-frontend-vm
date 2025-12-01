<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('structureMatrixPeriod.view.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="flex justify-end mt-4 gap-4">
          <LinkButton
            :to="{ name: 'structure-matrix-period' }"
            variant="secondary"
            customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
          >
            {{ t('structureMatrixPeriod.btnList') }}
          </LinkButton>

          <LinkButton
            :to="{ name: 'structure-matrix-period-edit', params: { id: route.params.id } }"
            variant="primary"
            class="min-w-[100px]"
          >
            <Edit class="w-5 h-5 mr-2" />
            {{ t('common.edit') }}
          </LinkButton>

          <LinkButton :to="{ name: 'structure-matrix-period-create' }" variant="primary" class="min-w-[100px]">
            <Plus class="w-5 h-5 mr-2" />
            {{ t('structureMatrixPeriod.btnAdd') }}
          </LinkButton>
        </div>

        <div class="mt-6">
          <Form />
        </div>
      </form>
    </PageStateWrapper>
  </DefaultLayout>
</template>
      
  <script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';

import { useStructureMatrixPeriodStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const store = useStructureMatrixPeriodStore();
const form = store.form;
store.resetForm();

const breadcrumbs = [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.structureMatrixPeriods', disabled: false, to: { name: 'structure-matrix-period' } },
  { title: 'structureMatrixPeriod.view.breadActive', disabled: true, to: null },
];

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.id, 'view'));

onMounted(async () => {
  await fetchWithState();
});
</script>
      