<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

import { useObjectiveRules } from '@/composables/useObjectiveRules';
import { useStrategicObjectiveStore } from '@/store';

const route = useRoute();
const objectiveStore = useStrategicObjectiveStore();
const { canUploadFile, canDeleteFile } = useObjectiveRules();

const attachableType = 'strategic_objectives';
const attachableId = route.params.id;

const objectiveStatus = computed(() => objectiveStore.form?.status);
</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
    :permissions="{
      access: PERMISSIONS.OBJ_ACCESS_FILES,
      manage: PERMISSIONS.OBJ_MANAGE_FILES,
    }"
    :rules="{
      canUpload: () => canUploadFile(objectiveStatus),
      canDelete: () => canDeleteFile(objectiveStatus),
    }"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'strategicObjective' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('strategicObjective.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
