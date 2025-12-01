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
          customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
        >
          {{ t('decision.btnList') }}
        </LinkButton>

        <!-- v-if="store.canHaveDecision" -->
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
</template>
  
<script setup>
import { Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useDecisionStore, useAlertStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const router = useRouter();
const store = useDecisionStore();
const alertStore = useAlertStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;

const decidableType = 'strategic_objectives';
const decidableId = route.params.id;

store.resetForm();
alertStore.resetMessage();

const backRoute = computed(() => {
  return { name: route.name.replace(/-create$/, '') };
});

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.requirements(decidableType, decidableId));

const onSubmit = async () => {
  try {
    const result = await store.create(decidableType, decidableId);
    showSimpleAlerte({ icon: 'success', text: result.message });
    router.push(backRoute.value);
  } catch (error) {
    const errors = error.errors || {};

    if (errors.decidable && errors.decidable.length > 0) {
      const message = errors.decidable[0];
      alertStore.updateMessage('danger', message);
      return;
    }
  }
};

onMounted(async () => {
  await fetchWithState();
});
</script>
  