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
        {{ t('actionControl.btnList') }}
      </LinkButton>
    </div>

    <div class="mt-6">
      <Form />
    </div>
  </PageStateWrapper>
</template>

<script setup>
import { Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';

import { useActionControlStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const store = useActionControlStore();
store.resetForm();

const backRoute = computed(() => {
  return { name: route.name.replace(/-show$/, '') };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.controlId));

onMounted(async () => {
  await fetchWithState();
});
</script>
