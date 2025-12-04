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
            name: isEdit ? 'action-edit' : 'action-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('action.tabs.detail') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_PLANNING)"
          :to="{
            name: 'action-show-planning-show',
            params: { id: route.params.id },
          }"
          :icon="Calendar"
          :match-pattern="/^action-(edit|show)-planning/"
        >
          {{ t('action.tabs.planning') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_PHASES)"
          :to="{
            name: isEdit ? 'action-edit-phase' : 'action-show-phase',
            params: { id: route.params.id },
          }"
          :icon="ListOrdered"
          :match-pattern="/^action-(edit|show)-phase/"
        >
          {{ t('action.tabs.phase') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_CONTROL)"
          :to="{
            name: isEdit ? 'action-edit-control' : 'action-show-control',
            params: { id: route.params.id },
          }"
          :icon="SquareCheckBigIcon"
          :match-pattern="/^action-(edit|show)-control/"
        >
          {{ t('action.tabs.control') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_STATUS)"
          :to="{
            name: isEdit ? 'action-edit-status' : 'action-show-status',
            params: { id: route.params.id },
          }"
          :icon="Activity"
          :match-pattern="/^action-(edit|show)-status/"
        >
          {{ t('action.tabs.status') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_REPORTING)"
          :to="{
            name: isEdit ? 'action-edit-performanceReport' : 'action-show-performanceReport',
            params: { id: route.params.id },
          }"
          :icon="BarChart3"
          :match-pattern="/^action-(edit|show)-performanceReport/"
        >
          {{ t('action.tabs.performanceReport') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_ALIGNMENT)"
          :to="{
            name: isEdit ? 'action-edit-alignment' : 'action-show-alignment',
            params: { id: route.params.id },
          }"
          :icon="Puzzle"
          :match-pattern="/^action-(edit|show)-alignment/"
        >
          {{ t('action.tabs.alignment') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_DECISIONS)"
          :to="{
            name: isEdit ? 'action-edit-decision' : 'action-show-decision',
            params: { id: route.params.id },
          }"
          :icon="ScrollTextIcon"
          :match-pattern="/^action-(edit|show)-decision/"
        >
          {{ t('action.tabs.decision') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.ACT_ACCESS_FILES)"
          :to="{
            name: isEdit ? 'action-edit-attachment' : 'action-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^action-(edit|show)-attachment/"
        >
          {{ t('action.tabs.attachment') }}
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

import { useActionStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import {
  Activity,
  BarChart3,
  Calendar,
  Eye,
  ListOrdered,
  Paperclip,
  Puzzle,
  ScrollTextIcon,
  SquareCheckBigIcon,
  SquarePen,
} from 'lucide-vue-next';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const store = useActionStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('action.edit.breadTitle') : t('action.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.operationalManagement', disabled: true, to: null },
  { title: 'sidebar.actions', disabled: false, to: { name: 'action' } },
  {
    title: isEdit.value ? 'action.edit.breadActive' : 'action.view.breadActive',
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
    await Promise.all([store.requirements([route.params.id]), store.find(route.params.id, 'edit')]);
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
