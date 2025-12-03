<script setup>
import ListPage from '@/views/attachment/ListPage.vue';

const route = useRoute();
const attachableType = 'action_domains';
const attachableId = route.params.id;
</script>

<template>
  <ListPage
    v-if="attachableId && attachableType"
    :attachable-type="attachableType"
    :attachable-id="attachableId"
  >
    <template #return-list-btn>
      <LinkButton
        :to="{ name: 'actionDomain' }"
        variant="secondary"
        customClass="min-w-[100px] px-3 text-gray-700 hover:bg-gray-400"
      >
        {{ t('actionDomain.btnList') }}
      </LinkButton>
    </template>
  </ListPage>
</template>
