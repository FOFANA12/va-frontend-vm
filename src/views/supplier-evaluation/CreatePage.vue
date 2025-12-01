<template>
  <PageStateWrapper
  >
    <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
      <div class="flex justify-end mt-4 gap-4">
        <LinkButton
          :to="backRoute"
          variant="secondary"
          customClass="min-w-[100px] px-3 sm:px-4 text-gray-700 hover:bg-gray-400"
        >
          {{ t('supplierEvaluation.btnList') }}
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
</template>
  
<script setup>
import { Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useSupplierEvaluationStore, useSupplierStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const router = useRouter();
const store = useSupplierEvaluationStore();
const supplierStore = useSupplierStore();

const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;
store.resetForm();

const supplierId = computed(() => route.params.id);

const backRoute = computed(() => ({ name: route.name.replace(/-create$/, '') }));


const onSubmit = async () => {
  try {
    const result = await store.create(supplierId.value);
    showSimpleAlerte({ icon: 'success', text: result.message });

    supplierStore.form.note = result.supplier_evaluation.note;
    router.push(backRoute.value);
  } catch (_error) {}
};

</script>
  