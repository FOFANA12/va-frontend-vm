<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('program.create.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="flex justify-end mt-4 gap-4">
          <LinkButton
            :to="{ name: 'program' }"
            variant="secondary"
            customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
          >
            {{ t('program.btnList') }}
          </LinkButton>

          <SubmitButton
            :busy="form.busy"
            customClass="min-w-[100px] bg-primary-500 px-3 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
          >
            <template #default>
              <Save class="w-5 h-5 mr-2" />
              {{ t('common.buttons.create') }}
            </template>

            <template #loading>
              <Save class="w-5 h-5 mr-2" />
              {{ t('common.buttons.processing') }}
            </template>
          </SubmitButton>
        </div>

        <div class="mt-6">
          <Form />
        </div>
      </form>
    </PageStateWrapper>
  </DefaultLayout>
</template>
  
<script setup>
import { Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useProgramStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const router = useRouter();
const store = useProgramStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();

const form = store.form;
store.resetForm();
alertStore.resetMessage();

const breadcrumbs = [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.maillage', disabled: true, to: null },
  { title: 'sidebar.programs', disabled: false, to: { name: 'program' } },
  { title: 'program.create.breadActive', disabled: true, to: null },
];

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.requirements());

const onSubmit = async () => {
  alertStore.resetMessage();

  try {
    const result = await store.create();
    showSimpleAlerte({ icon: 'success', text: result.message });
    router.push({ name: 'program' });
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

onMounted(async () => {
  await fetchWithState();
});
</script>
  