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
            name: isEdit ? 'supplier-edit' : 'supplier-show',
            params: { id: route.params.id },
          }"
          :icon="isEdit ? SquarePen : Eye"
          exact
        >
          {{ t('supplier.tabs.supplier') }}
        </Tab>
        <Tab
          v-if="hasPermission(PERMISSIONS.SUP_ACCESS_CONTRACTS)"
          :to="{
            name: isEdit ? 'supplier-edit-contract' : 'supplier-show-contract',
            params: { id: route.params.id },
          }"
          :icon="FileText"
          :match-pattern="/^supplier-(edit|show)-contract/"
        >
          {{ t('supplier.tabs.contracts') }}
        </Tab>
        <Tab
          v-if="hasPermission(PERMISSIONS.SUP_ACCESS_EVALUATIONS)"
          :to="{
            name: isEdit ? 'supplier-edit-evaluation' : 'supplier-show-evaluation',
            params: { id: route.params.id },
          }"
          :icon="FileText"
          :match-pattern="/^supplier-(edit|show)-evaluation/"
        >
          {{ t('supplier.tabs.evaluations') }}
        </Tab>

        <Tab
          v-if="hasPermission(PERMISSIONS.SUP_ACCESS_FILES)"
          :to="{
            name: isEdit ? 'supplier-edit-attachment' : 'supplier-show-attachment',
            params: { id: route.params.id },
          }"
          :icon="Paperclip"
          :match-pattern="/^supplier-(edit|show)-attachment/"
        >
          {{ t('supplier.tabs.attachment') }}
        </Tab>
      </Tabs>

      <!-- Route content -->
      <RouterView :key="route.fullPath" />
    </PageStateWrapper>
  </DefaultLayout>
</template>

<script setup>
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

import { useSupplierStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import { Eye, FileText, Paperclip, SquarePen } from 'lucide-vue-next';
import Tabs from '@/components/ui/Tabs.vue';
import Tab from '@/components/ui/Tab.vue';

import { usePermission } from '@/composables/usePermissions';
import PERMISSIONS from '@/constants/permissions';
const { hasPermission } = usePermission();

const { t } = useI18n();
const route = useRoute();
const store = useSupplierStore();

const isEdit = computed(() => route.name?.includes('edit'));
const mode = computed(() => (isEdit.value ? 'edit' : 'view'));
const previousMode = ref(mode.value);

const pageTitle = computed(() =>
  isEdit.value ? t('supplier.edit.breadTitle') : t('supplier.view.breadTitle')
);

const breadcrumbs = computed(() => [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.financialManagement', disabled: true, to: null },
  { title: 'sidebar.suppliers', disabled: false, to: { name: 'supplier' } },
  {
    title: isEdit.value ? 'supplier.edit.breadActive' : 'supplier.view.breadActive',
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
