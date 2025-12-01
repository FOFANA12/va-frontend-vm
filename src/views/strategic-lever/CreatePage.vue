<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('strategicLever.create.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="flex justify-end mt-4 gap-4">
          <LinkButton
            :to="{ name: 'strategic-levers' }"
            variant="secondary"
            customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
          >
            {{ t('strategicLever.btnList') }}
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

import { useStrategicLeverStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const router = useRouter();
const store = useStrategicLeverStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;
store.resetForm();

const breadcrumbs = [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.strategicManagement', disabled: true, to: null },
  {
    title: 'sidebar.strategicLevers',
    disabled: false,
    to: { name: 'strategic-levers' },
  },
  { title: 'strategicLever.create.breadActive', disabled: true, to: null },
];

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.requirements());

const onSubmit = async () => {
  try {
    const result = await store.create();
    showSimpleAlerte({ icon: 'success', text: result.message });
    router.push({ name: 'strategic-levers' });
  } catch (_error) {}
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  