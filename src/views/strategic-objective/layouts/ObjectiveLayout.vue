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
            name: isEdit ? 'strategicObjective-edit' : 'strategicObjective-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('strategicObjective.tabs.detail') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.OBJ_ACCESS_ALIGNMENT)"
          :to="{
            name: isEdit
              ? 'strategicObjective-edit-alignment'
              : 'strategicObjective-show-alignment',
            params: { id: route.params.id },
          }"
          :icon="Puzzle"
          :match-pattern="/^strategicObjective-(edit|show)-alignment/"
        >
          {{ t('strategicObjective.tabs.alignment') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.OBJ_ACCESS_DECISIONS)"
          :to="{
            name: isEdit ? 'strategicObjective-edit-decision' : 'strategicObjective-show-decision',
            params: { id: route.params.id },
          }"
          :icon="ScrollTextIcon"
          :match-pattern="/^strategicObjective-(edit|show)-decision/"
        >
          {{ t('strategicObjective.tabs.decision') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.OBJ_ACCESS_FILES)"
          :to="{
            name: isEdit
              ? 'strategicObjective-edit-attachment'
              : 'strategicObjective-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^strategicObjective-(edit|show)-attachment/"
        >
          {{ t('strategicObjective.tabs.attachment') }}
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

import { useStrategicObjectiveStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { Eye, Paperclip, Puzzle, ScrollTextIcon, SquarePen } from 'lucide-vue-next';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const store = useStrategicObjectiveStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('strategicObjective.edit.breadTitle') : t('strategicObjective.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.strategicManagement', disabled: true, to: null },
  { title: 'sidebar.strategicObjectives', disabled: false, to: { name: 'strategicObjective' } },
  {
    title: isEdit.value
      ? 'strategicObjective.edit.breadActive'
      : 'strategicObjective.view.breadActive',
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
