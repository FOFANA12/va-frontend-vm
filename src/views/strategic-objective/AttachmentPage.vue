<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

const route = useRoute();
const attachableType = 'strategic_objectives';
const attachableId = route.params.id;

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
