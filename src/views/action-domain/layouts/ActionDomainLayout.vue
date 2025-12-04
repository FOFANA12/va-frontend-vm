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
            name: isEdit ? 'actionDomain-edit' : 'actionDomain-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('actionDomain.tabs.detail') }}
        </Tab>

        <Tab
          :to="{
            name: isEdit ? 'actionDomain-edit-status' : 'actionDomain-show-status',
            params: { id: route.params.id },
          }"
          :icon="Activity"
          :match-pattern="/^actionDomain-(edit|show)-status/"
        >
          {{ t('actionDomain.tabs.status') }}
        </Tab>

        <Tab
          :to="{
            name: isEdit ? 'actionDomain-edit-state' : 'actionDomain-show-state',
            params: { id: route.params.id },
          }"
          :icon="TrendingUp"
          :match-pattern="/^actionDomain-(edit|show)-state/"
        >
          {{ t('actionDomain.tabs.state') }}
        </Tab>

        <Tab
          :to="{
            name: isEdit ? 'actionDomain-edit-attachment' : 'actionDomain-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^actionDomain-(edit|show)-attachment/"
        >
          {{ t('actionDomain.tabs.attachment') }}
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

import { useActionDomainStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { Activity, Eye, Paperclip, SquarePen, TrendingUp } from 'lucide-vue-next';

const { t } = useI18n();
const route = useRoute();
const store = useActionDomainStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('actionDomain.edit.breadTitle') : t('actionDomain.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.maillage', disabled: true, to: null },
  { title: 'sidebar.actionDomains', disabled: false, to: { name: 'actionDomain' } },
  {
    title: isEdit.value ? 'actionDomain.edit.breadActive' : 'actionDomain.view.breadActive',
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
