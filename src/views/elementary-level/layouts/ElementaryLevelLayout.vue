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
          :to="{
            name: isEdit ? 'elementaryLevel-edit' : 'elementaryLevel-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('elementaryLevel.tabs.detail') }}
        </Tab>

         <Tab
          :to="{
            name: isEdit ? 'elementaryLevel-edit-status' : 'elementaryLevel-show-status',
            params: { id: route.params.id },
          }"
          :icon="Activity"
          :match-pattern="/^elementaryLevel-(edit|show)-status/"
        >
          {{ t('elementaryLevel.tabs.status') }}
        </Tab>
        
        <Tab
          :to="{
            name: isEdit ? 'elementaryLevel-edit-state' : 'elementaryLevel-show-state',
            params: { id: route.params.id },
          }"
          :icon="TrendingUp"
          :match-pattern="/^elementaryLevel-(edit|show)-state/"
        >
          {{ t('elementaryLevel.tabs.state') }}
        </Tab>

        <Tab
          :to="{
            name: isEdit ? 'elementaryLevel-edit-attachment' : 'elementaryLevel-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^elementaryLevel-(edit|show)-attachment/"
        >
          {{ t('elementaryLevel.tabs.attachment') }}
        </Tab>
         
        <Tab
          :to="{
            name: isEdit ? 'elementaryLevel-edit-performanceReport' : 'elementaryLevel-show-performanceReport',
            params: { id: route.params.id },
          }"
          :icon="BarChart3"
          :match-pattern="/^elementaryLevel-(edit|show)-performanceReport/"
        >
          {{ t('elementaryLevel.tabs.performanceReport') }}
        </Tab>
      </Tabs>

      <!-- Route content -->
      <RouterView :key="route.fullPath" />
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import Tabs from '@/components/ui/Tabs.vue';
import Tab from '@/components/ui/Tab.vue';

import { useElementaryLevelStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import {
  Activity,
  Eye,
  Paperclip,
  SquarePen,
  TrendingUp,
  BarChart3,
} from 'lucide-vue-next';

const { t } = useI18n();
const route = useRoute();
const store = useElementaryLevelStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('elementaryLevel.edit.breadTitle') : t('elementaryLevel.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.maillage', disabled: true, to: null },
  { title: 'sidebar.elementaryLevels', disabled: false, to: { name: 'elementaryLevel' } },
  {
    title: isEdit.value ? 'elementaryLevel.edit.breadActive' : 'elementaryLevel.view.breadActive',
    disabled: true,
    to: null,
  },
]);

store.resetForm();

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => {
  if (mode.value === 'edit') {
    await Promise.all([store.requirements(), store.find(route.params.id, 'edit')]);
  } else {
    await store.find(route.params.id, 'view');
  }
});

onMounted(async () => {
  await fetchWithState();
});

watch(mode, async (newMode, oldMode) => {
  if (newMode !== oldMode) {
    await fetchWithState();
    previousMode.value = newMode;
  }
});
</script>
