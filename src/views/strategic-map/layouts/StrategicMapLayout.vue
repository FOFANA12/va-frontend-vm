<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <!-- Breadcrumb -->
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="pageTitle" />

      <!-- Tabs -->
      <Tabs class="mt-4">
        <Tab
          :to="{ name: 'strategicMap-details', params: { id: route.params.id } }"
          :icon="FolderOpen"
          exact
        >
          {{ t('strategicMap.tabs.detail') }}
        </Tab>

        <Tab
          :to="{
            name: 'strategicMap-show-matrix',
            params: { id: route.params.id },
          }"
          :icon="Layers"
          :match-pattern="/^strategicMap-show-matrix/"
        >
          {{ t('strategicMap.tabs.matrix') }}
        </Tab>

        <Tab
          :to="{
            name: 'strategicMap-show-stakeholder',
            params: { id: route.params.id },
          }"
          :icon="Users"
          :match-pattern="/^strategicMap-show-stakeholder/"
        >
          {{ t('strategicMap.tabs.stakeholder') }}
        </Tab>
      </Tabs>

      <RouterView :key="route.fullPath" />
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import { FolderOpen, Layers, Users } from 'lucide-vue-next';
import { useStrategicMapStore } from '@/store';
import { usePageState } from '@/composables/usePageState';

import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import Tabs from '@/components/ui/Tabs.vue';
import Tab from '@/components/ui/Tab.vue';

const { t } = useI18n();
const route = useRoute();
const store = useStrategicMapStore();

const pageTitle = computed(() => t('strategicMap.details.pageTitle'));

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.strategicManagement', disabled: true, to: null },
  { title: 'sidebar.strategicMaps', disabled: false, to: { name: 'strategicMap' } },
  { title: 'strategicMap.details.breadActive', disabled: true, to: null },
]);

store.resetForm();

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  await store.find(route.params.id, 'details');
});

onMounted(fetchWithState);
</script>
