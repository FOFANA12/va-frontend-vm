<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchWithState"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('logActivity.view.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="flex justify-end mt-4 gap-4">
          <LinkButton
            :to="{ name: 'log-activity' }"
            variant="secondary"
            customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
          >
            {{ t('logActivity.btnList') }}
          </LinkButton>
        </div>

        <div class="mt-6">
          <div class="w-full mx-auto bg-white rounded-lg">
            <div class="card-body p-4">
              <div class="grid grid-cols-12 gap-4">
                <!-- ID -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="id"
                    name="id"
                    :label="t('logActivity.form.id')"
                    :placeholder="t('logActivity.form.id')"
                    :model-value="form.id || '-'"
                  />
                </div>

                <!-- Log name -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="log_name"
                    name="log_name"
                    :label="t('logActivity.form.logName')"
                    :placeholder="t('logActivity.form.logName')"
                    :model-value="form.log_name || '-'"
                  />
                </div>

                <!-- Subject type -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="subject_type"
                    name="subject_type"
                    :label="t('logActivity.form.subjectType')"
                    :placeholder="t('logActivity.form.subjectType')"
                    :model-value="form.subject_type || '-'"
                  />
                </div>

                <!-- Subject ID -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="subject_id"
                    name="subject_id"
                    :label="t('logActivity.form.subjectId')"
                    :placeholder="t('logActivity.form.subjectId')"
                    :model-value="form.subject_id || '-'"
                  />
                </div>

                <!-- Description -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="description"
                    name="description"
                    :label="t('logActivity.form.description')"
                    :placeholder="t('logActivity.form.description')"
                    :model-value="form.description || '-'"
                  />
                </div>

                <!-- Causer -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="causer"
                    name="causer"
                    :label="t('logActivity.form.causer')"
                    :placeholder="t('logActivity.form.causer')"
                    :model-value="form.causer || '-'"
                  />
                </div>

                <!-- Created At -->
                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                  <InputReadonly
                    id="created_at"
                    name="created_at"
                    :label="t('logActivity.form.createdAt')"
                    :placeholder="t('logActivity.form.createdAt')"
                    :model-value="form.created_at || '-'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="w-full mx-auto bg-white rounded-lg my-6">
            <div class="card-header">
              <h3 class="text-lg p-4 pt-2 pb-2">
                {{ t('logActivity.sections.properties') }}
              </h3>
              <hr class="border-t border-gray-200 w-full mb-0" />
            </div>
            <div class="card-body p-4">
              <pre class="bg-gray-100 p-4 rounded text-sm overflow-x-auto"
                >{{ JSON.stringify(form.properties, null, 2) }}
        </pre
              >
            </div>
          </div>
        </div>
      </form>
    </PageStateWrapper>
  </DefaultLayout>
</template>
      
  <script setup>
import { Edit, Plus } from 'lucide-vue-next';

import { useLogActivityStore } from '@/store';
import { usePageState } from '@/composables/usePageState';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';

const route = useRoute();
const store = useLogActivityStore();
const form = store.form;
store.resetForm();

const breadcrumbs = [
  { title: 'sidebar.dashboard', disabled: false, to: '/' },
  { title: 'sidebar.monitoring', disabled: true },
  { title: 'sidebar.logActivities', disabled: false, to: { name: 'log-activity-show' } },
  { title: 'logActivity.view.breadActive', disabled: true, to: null },
];

const {
  isLoading,
  hasError,
  errorMessage,
  fetchData: fetchWithState,
} = usePageState(async () => await store.find(route.params.id, 'view'));

onMounted(async () => {
  await fetchWithState();
});
</script>
      