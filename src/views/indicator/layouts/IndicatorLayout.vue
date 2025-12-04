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
            name: isEdit ? 'indicator-edit' : 'indicator-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('indicator.tabs.detail') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_STATUS)"
          :to="{
            name: isEdit ? 'indicator-edit-status' : 'indicator-show-status',
            params: { id: route.params.id },
          }"
          :icon="Activity"
          :match-pattern="/^indicator-(edit|show)-status/"
        >
          {{ t('indicator.tabs.status') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_PLANNING)"
          :to="{
            name: 'indicator-show-planning-show',
            params: { id: route.params.id },
          }"
          :icon="Calendar"
          :match-pattern="/^indicator-(edit|show)-planning/"
        >
          {{ t('indicator.tabs.planning') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_CONTROL)"
          :to="{
            name: isEdit ? 'indicator-edit-control' : 'indicator-show-control',
            params: { id: route.params.id },
          }"
          :icon="SquareCheckBigIcon"
          :match-pattern="/^indicator-(edit|show)-control/"
        >
          {{ t('indicator.tabs.control') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_FILES)"
          :to="{
            name: isEdit ? 'indicator-edit-attachment' : 'indicator-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^indicator-(edit|show)-attachment/"
        >
          {{ t('indicator.tabs.attachment') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_REPORTING)"
          :to="{
            name: isEdit ? 'indicator-edit-performanceReport' : 'indicator-show-performanceReport',
            params: { id: route.params.id },
          }"
          :icon="BarChart3"
          :match-pattern="/^indicator-(edit|show)-performanceReport/"
        >
          {{ t('indicator.tabs.performanceReport') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.IND_ACCESS_DECISIONS)"
          :to="{
            name: isEdit ? 'indicator-edit-decision' : 'indicator-show-decision',
            params: { id: route.params.id },
          }"
          :icon="ScrollTextIcon"
          :match-pattern="/^indicator-(edit|show)-decision/"
        >
          {{ t('indicator.tabs.decision') }}
        </Tab>
      </Tabs>

      <!-- Route content -->
      <RouterView :key="route.name" />
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import Tabs from '@/components/ui/Tabs.vue';
import Tab from '@/components/ui/Tab.vue';

import { useIndicatorStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import {
  Activity,
  BarChart3,
  Calendar,
  Eye,
  Paperclip,
  SquareCheckBigIcon,
  SquarePen,
} from 'lucide-vue-next';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const store = useIndicatorStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('indicator.edit.breadTitle') : t('indicator.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.strategicManagement', disabled: true, to: null },
  { title: 'sidebar.indicators', disabled: false, to: { name: 'indicator' } },
  {
    title: isEdit.value ? 'indicator.edit.breadActive' : 'indicator.view.breadActive',
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

/**
 * watch(
  () => route.name,
  async (newName, oldName) => {
    if (newName !== oldName) {
      await fetchWithState();
    }
  }
);
 */
</script>
