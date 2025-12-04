<template>
  <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'supplier' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('supplier.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.READ_SUPPLIERS)"
        :to="{ name: 'supplier-show', params: { id: route.params.id } }"
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
</template>
    
<script setup>
import { Eye, Save } from 'lucide-vue-next';
import Form from './components/form/Edit.vue';

import { useSupplierStore } from '@/store';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const route = useRoute();
const store = useSupplierStore();
const { showSimpleAlerte } = useSwalAlerte();
const form = store.form;

const onSubmit = async () => {
  try {
    const result = await store.update(form.id);
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (_error) {}
};
</script>
    