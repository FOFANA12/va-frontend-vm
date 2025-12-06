<script setup>
import ListPage from '@/views/attachment/ListPage.vue';
import PERMISSIONS from '@/constants/permissions';

const route = useRoute();
const attachableType = 'strategic_domains';
const attachableId = route.params.id;
</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
      :permissions="{
      access: PERMISSIONS.ACCESS_STRATEGIC_DOMAINS,
      manage: PERMISSIONS.ACCESS_STRATEGIC_DOMAINS,
    }"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'strategicDomain' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('strategicDomain.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
