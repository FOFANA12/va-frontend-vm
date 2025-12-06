<template>
  <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
    <div class="flex justify-end mt-4 gap-4">
      <LinkButton
        :to="{ name: 'strategicDomain' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('strategicDomain.btnList') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.UPDATE_STRATEGIC_DOMAIN)"
        :to="{ name: 'strategicDomain-edit', params: { id: route.params.id } }"
        variant="primary"
        class="min-w-[100px]"
      >
        <Edit class="w-5 h-5 mr-2" />
        {{ t('common.edit') }}
      </LinkButton>

      <LinkButton
        v-if="hasPermission(PERMISSIONS.CREATE_STRATEGIC_DOMAIN)"
        :to="{ name: 'strategicDomain-create' }"
        variant="primary"
        class="min-w-[100px]"
      >
        <Plus class="w-5 h-5 mr-2" />
        {{ t('strategicDomain.btnAdd') }}
      </LinkButton>
    </div>

    <div class="mt-6">
      <Form />
    </div>
  </form>
</template>
      
  <script setup>
import { Edit, Plus } from 'lucide-vue-next';
import Form from './components/form/View.vue';
import { useAlertStore } from '@/store';

const route = useRoute();
const alertStore = useAlertStore();
alertStore.resetMessage();

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();
</script>
      