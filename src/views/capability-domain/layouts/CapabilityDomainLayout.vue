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
            name: isEdit ? 'capabilityDomain-edit' : 'capabilityDomain-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('capabilityDomain.tabs.detail') }}
        </Tab>

         <Tab
          :to="{
            name: isEdit ? 'capabilityDomain-edit-status' : 'capabilityDomain-show-status',
            params: { id: route.params.id },
          }"
          :icon="Activity"
          :match-pattern="/^capabilityDomain-(edit|show)-status/"
        >
          {{ t('capabilityDomain.tabs.status') }}
        </Tab>
        
        <Tab
          :to="{
            name: isEdit ? 'capabilityDomain-edit-state' : 'capabilityDomain-show-state',
            params: { id: route.params.id },
          }"
          :icon="TrendingUp"
          :match-pattern="/^capabilityDomain-(edit|show)-state/"
        >
          {{ t('capabilityDomain.tabs.state') }}
        </Tab>

        <Tab
          :to="{
            name: isEdit ? 'capabilityDomain-edit-attachment' : 'capabilityDomain-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^capabilityDomain-(edit|show)-attachment/"
        >
          {{ t('capabilityDomain.tabs.attachment') }}
        </Tab>
        
        <Tab
          :to="{
            name: isEdit ? 'capabilityDomain-edit-report' : 'capabilityDomain-show-report',
            params: { id: route.params.id },
          }"
          :icon="BarChart3"
          :match-pattern="/^capabilityDomain-(edit|show)-report/"
        >
          {{ t('capabilityDomain.tabs.report') }}
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

import { useCapabilityDomainStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import {
  Activity,
  Eye,
  Paperclip,
  SquarePen,
  TrendingUp,
  BarChart3
} from 'lucide-vue-next';

const { t } = useI18n();
const route = useRoute();
const store = useCapabilityDomainStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('capabilityDomain.edit.breadTitle') : t('capabilityDomain.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.maillage', disabled: true, to: null },
  { title: 'sidebar.capabilityDomains', disabled: false, to: { name: 'capabilityDomain' } },
  {
    title: isEdit.value ? 'capabilityDomain.edit.breadActive' : 'capabilityDomain.view.breadActive',
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
