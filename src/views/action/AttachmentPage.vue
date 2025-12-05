<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

import { useActionRules } from '@/composables/useActionRules';
import { useActionStore } from '@/store';

const route = useRoute();
const actionStore = useActionStore();

const { canUploadFile, canDeleteFile } = useActionRules();

const attachableType = 'actions';
const attachableId = route.params.id;

const actionStatus = computed(() => actionStore.form?.status);

</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
    :permissions="{
      access: PERMISSIONS.ACT_ACCESS_FILES,
      manage: PERMISSIONS.ACT_MANAGE_FILES,
    }"
    :rules="{
      canUpload: () => canUploadFile(actionStatus),
      canDelete: () => canDeleteFile(actionStatus),
    }"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'action' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('action.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
