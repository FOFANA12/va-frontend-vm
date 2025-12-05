<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

import { useIndicatorRules } from '@/composables/useIndicatorRules';
import { useIndicatorStore } from '@/store';

const route = useRoute();
const indicatorStore = useIndicatorStore();

const { canUploadFile, canDeleteFile } = useIndicatorRules();

const attachableType = 'indicators';
const attachableId = route.params.id;

const indicatorStatus = computed(() => indicatorStore.form?.status);
</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
    :permissions="{
      access: PERMISSIONS.IND_ACCESS_FILES,
      manage: PERMISSIONS.IND_MANAGE_FILES,
    }"
    :rules="{
      canUpload: () => canUploadFile(indicatorStatus),
      canDelete: () => canDeleteFile(indicatorStatus),
    }"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'indicator' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('indicator.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
