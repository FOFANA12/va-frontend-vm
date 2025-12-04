<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('strategicLever.edit.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="flex justify-end mt-4 gap-4">
          <LinkButton
            :to="{ name: 'strategic-levers' }"
            variant="secondary"
            customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
          >
            {{ t('strategicLever.btnList') }}
          </LinkButton>

          <LinkButton
            v-if="hasPermission(PERMISSIONS.READ_STRATEGIC_LEVERS)"
            :to="{ name: 'strategic-levers-show', params: { id: route.params.id } }"
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
          <Form context="edit" />
        </div>
      </form>
    </PageStateWrapper>
  </DefaultLayout>
</template>
    
<script setup>
import { Eye, Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useStrategicLeverStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const route = useRoute();
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
  { title: 'strategicLever.edit.breadActive', disabled: true, to: null },
];

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await Promise.all([store.requirements('edit'), store.find(route.params.id, 'edit')]);
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
    