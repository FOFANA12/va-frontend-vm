<template>
  <DefaultLayout>
    <PageStateWrapper
      :isLoading="isLoading"
      :hasError="hasError"
      :errorMessage="errorMessage"
      :onRetry="fetchData"
    >
      <Breadcrumbs :breadcrumbs="breadcrumbs" :pageTitle="t('profile.breadTitle')" />

      <form @submit.prevent="onSubmit" @keydown="form.onKeydown($event)">
        <div class="w-full mx-auto bg-white rounded-lg mt-4">
          <div class="card-header">
            <h2 class="text-xl p-4 pt-2 pb-2">{{ t('profile.sections.personalInformation') }}</h2>
            <hr class="border-t border-gray-200 w-full mb-0" />
          </div>
          <div class="card-body p-4">
            <div class="grid grid-cols-12 gap-4">
              <!-- Name -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="name"
                  name="name"
                  :label="t('profile.form.name')"
                  v-model="form.name"
                  :placeholder="t('profile.form.namePlaceholder')"
                  :error="form.errors.get('name')"
                  :form="form"
                  required
                />
              </div>

              <!-- Email -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="email"
                  name="email"
                  :label="t('profile.form.email')"
                  v-model="form.email"
                  :placeholder="t('profile.form.emailPlaceholder')"
                  :error="form.errors.get('email')"
                  :form="form"
                  
                  autocomplete="off"
                  required
                />
              </div>

              <!-- Phone -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="phone"
                  name="phone"
                  :label="t('profile.form.phone')"
                  v-model="form.phone"
                  :placeholder="t('profile.form.phonePlaceholder')"
                  :error="form.errors.get('phone')"
                  :form="form"
                />
              </div>

              <!-- Lang -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <SingleSelect
                  id="lang"
                  name="lang"
                  v-model="form.lang"
                  :label="t('profile.form.lang')"
                  :options="languageOptions"
                  ::placeholder="t('profile.form.langPlaceholder')"
                  :error="form.errors.get('lang')"
                  :control-class="'px-3 py-2.5'"
                  :dropdown-class="'max-h-60'"
                  :option-class="'text-sm'"
                  :empty-message="t('common.select.noResults')"
                  :search-placeholder="t('common.select.searchPlaceholder')"
                  value-key="value"
                  label-key="label"
                  filterable
                  clearable
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mx-auto bg-white rounded-lg mt-4" v-if="form.is_employee">
          <div class="card-header">
            <h2 class="text-xl p-4 pt-2 pb-2">
              {{ t('profile.sections.professionalInformation') }}
            </h2>
            <hr class="border-t border-gray-200 w-full mb-0" />
          </div>
          <div class="card-body p-4">
            <div class="grid grid-cols-12 gap-4">
              <!-- Structure -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <InputReadonly
                  id="structure"
                  name="structure"
                  :label="t('profile.form.structure')"
                  :placeholder="t('profile.form.structurePlaceholder')"
                  :modelValue="`${form.structure?.name} (${form.structure?.abbreviation})`"
                  readonly
                />
              </div>

              <!-- Job Title -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="job_title"
                  name="job_title"
                  :label="t('profile.form.jobTitle')"
                  v-model="form.job_title"
                  :placeholder="t('profile.form.jobTitlePlaceholder')"
                  :error="form.errors.get('job_title')"
                />
              </div>

              <!-- Floor -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="floor"
                  name="floor"
                  :label="t('profile.form.floor')"
                  v-model="form.floor"
                  :placeholder="t('profile.form.floorPlaceholder')"
                />
              </div>

              <!-- Office -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="office"
                  name="office"
                  :label="t('profile.form.office')"
                  v-model="form.office"
                  :placeholder="t('profile.form.officePlaceholder')"
                  :error="form.errors.get('office')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mx-auto bg-white rounded-lg mt-4">
          <div class="card-header">
            <h2 class="text-xl p-4 pt-2 pb-2">
              {{ t('profile.sections.security') }}
            </h2>
            <hr class="border-t border-gray-200 w-full mb-0" />
          </div>
          <div class="card-body p-4">
            <div class="grid grid-cols-12 gap-4">
              <!-- Password -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  v-model="form.password"
                  id="password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  :label="t('profile.form.password')"
                  :placeholder="t('profile.form.passwordPlaceholder')"
                  :error="form.errors.get('password')"
                  autocomplete="new-password"
                >
                  <template #action>
                    <button
                      type="button"
                      @click="togglePasswordVisibility"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <Eye v-if="!showPassword" :size="18" />
                      <EyeOff v-else :size="18" />
                    </button>
                  </template>
                </Input>
              </div>

              <!-- Password Confirmation -->
              <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  :label="t('profile.form.passwordConfirm')"
                  v-model="form.password_confirmation"
                  :placeholder="t('profile.form.passwordConfirmPlaceholder')"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :error="form.errors.get('password_confirmation')"
                  autocomplete="new-password"
                >
                  <template #action>
                    <button
                      type="button"
                      @click="toggleConfirmPasswordVisibility"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label="Toggle Password Visibility"
                    >
                      <EyeOff v-if="showConfirmPassword" :size="18" />
                      <Eye v-else :size="18" />
                    </button>
                  </template>
                </Input>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end py-2 mt-2">
          <SubmitButton
            :busy="form.busy"
            customClass="w-auto bg-primary-500 py-2.5 px-4 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
          >
            <template #default>
              <Save class="w-5 h-5 mr-2" />
              {{ t('common.buttons.save') }}
            </template>

            <template #loading>
              <Save class="w-5 h-5 mr-2" />
              {{ t('common.buttons.processing') }}
            </template>
          </SubmitButton>
        </div>
      </form>
    </PageStateWrapper>
  </DefaultLayout>
</template>

  
  <script setup>
import { onMounted } from 'vue';
import { useProfileStore, useLanguageStore, useAuthStore } from '@/store';
import PageStateWrapper from '@/components/layout/PageStateWrapper.vue';
import { usePageState } from '@/composables/usePageState';
import { Eye, EyeOff, Save } from 'lucide-vue-next';
import { useSwalAlerte } from '@/composables/useSwalAlerte';

const { showSimpleAlerte } = useSwalAlerte();

const { t } = useI18n();
const profileStore = useProfileStore();
const languageStore = useLanguageStore();
const authStore = useAuthStore();

const form = profileStore.form;
profileStore.resetForm();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const languageOptions = computed(() =>
  languageStore.languages.map((l) => ({
    ...l,
    label: l.label[languageStore.lang],
  }))
);

const { isLoading, hasError, errorMessage, fetchData } = usePageState(async () => {
  await profileStore.getProfile();
});

const breadcrumbs = [
  {
    title: 'sidebar.dashboard',
    disabled: false,
    to: '/',
  },
  {
    title: 'profile.breadActive',
    disabled: true,
    to: {
      name: 'profile',
    },
  },
];

const onSubmit = async () => {
  try {
    const result = await profileStore.updateProfile();
    authStore.setUser(result.user);
    showSimpleAlerte({ icon: 'success', text: result.message });
  } catch (_error) {}
};

onMounted(async () => {
  await fetchData();
});
</script>
  