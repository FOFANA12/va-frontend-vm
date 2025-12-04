<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

const route = useRoute();
const attachableType = 'suppliers';
const attachableId = route.params.id;
</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
     :permissions="{
      access: PERMISSIONS.SUP_ACCESS_FILES,
      manage: PERMISSIONS.SUP_MANAGE_FILES,
    }"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'supplier' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('supplier.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
