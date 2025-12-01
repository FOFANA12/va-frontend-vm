<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.personalInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('employee.form.name')"
              v-model="form.name"
              :placeholder="t('employee.form.namePlaceholder')"
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
              :label="t('employee.form.email')"
              v-model="form.email"
              :placeholder="t('employee.form.emailPlaceholder')"
              :error="form.errors.get('email')"
              :form="form"
              :required="form.can_logged_in"
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="phone"
              name="phone"
              :label="t('employee.form.phone')"
              v-model="form.phone"
              :placeholder="t('employee.form.phonePlaceholder')"
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
              :label="t('employee.form.lang')"
              :options="languageOptions"
              ::placeholder="t('employee.form.langPlaceholder')"
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

          <!-- Status -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              class="checkbox-primary h-5 w-5 mr-2"
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>

          <!-- Can be logged in -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
            <input
              id="can_logged_in"
              type="checkbox"
              v-model="form.can_logged_in"
              class="checkbox-primary h-5 w-5 mr-2"
            />
            <label for="can_logged_in" class="text-gray-700">
              {{ t('employee.form.canLoggedIn') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-4">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.professionalInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="structure"
              name="structure"
              v-model="form.structure"
              :label="t('employee.form.structure')"
              :options="employeeStore.structures"
              :placeholder="t('employee.form.structurePlaceholder')"
              :error="form.errors.get('structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Job Title -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="job_title"
              name="job_title"
              :label="t('employee.form.jobTitle')"
              v-model="form.job_title"
              :placeholder="t('employee.form.jobTitlePlaceholder')"
              :error="form.errors.get('job_title')"
              :form="form"
            />
          </div>

          <!-- Floor -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="floor"
              name="floor"
              :label="t('employee.form.floor')"
              v-model="form.floor"
              :placeholder="t('employee.form.floorPlaceholder')"
              :error="form.errors.get('floor')"
              :form="form"
            />
          </div>

          <!-- Office -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="office"
              name="office"
              :label="t('employee.form.office')"
              v-model="form.office"
              :placeholder="t('employee.form.officePlaceholder')"
              :error="form.errors.get('office')"
              :form="form"
            />
          </div>

          <!-- Role -->
          <div v-if="form.can_logged_in" class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="role"
              name="role"
              v-model="form.role"
              :label="t('employee.form.role')"
              :options="employeeStore.roles"
              :placeholder="t('employee.form.rolePlaceholder')"
              :error="form.errors.get('role')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Section Informations de connexion -->
    <div v-if="form.can_logged_in" class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.security') }}
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
              :required="form.can_logged_in && props.context === 'create'"
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
              :required="form.can_logged_in && props.context === 'create'"
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
  </div>
</template>
  
  <script setup>
import { useEmployeeStore, useLanguageStore } from '@/store';
import { Eye, EyeOff } from 'lucide-vue-next';

const employeeStore = useEmployeeStore();
const languageStore = useLanguageStore();
const languageOptions = computed(() =>
  languageStore.languages.map((l) => ({
    ...l,
    label: l.label[languageStore.lang],
  }))
);

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const form = employeeStore.form;
</script>
  