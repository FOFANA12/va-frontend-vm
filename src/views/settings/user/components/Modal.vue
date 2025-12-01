<template>
  <CustomModal size="lg" :isModalOpen="isModalOpen" @update:isModalOpen="closeModal">
    <template #title>
      <h2 class="text-md font-semibold">{{ modalTitle }}</h2>
    </template>

    <template #body>
      <form @submit.prevent="onSubmit" @keyup.enter="onSubmit" @keydown="form.onKeydown($event)">
        <div class="grid grid-cols-12 gap-6">
          <!-- Name -->
          <div class="col-span-12 lg:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="name"
              name="name"
              :label="t('settings.user.form.name')"
              :placeholder="t('settings.user.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
            <Input
              v-else
              id="name"
              name="name"
              v-model="form.name"
              :label="t('settings.user.form.name')"
              :placeholder="t('settings.user.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 lg:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="email"
              name="email"
              :label="t('settings.user.form.email')"
              :placeholder="t('settings.user.form.emailPlaceholder')"
              :modelValue="form.email"
              readonly
            />
            <Input
              v-else
              id="email"
              name="email"
              v-model="form.email"
              :label="t('settings.user.form.email')"
              :placeholder="t('settings.user.form.emailPlaceholder')"
              :error="form.errors.get('email')"
              :form="form"
              autocomplete="off"
              required
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12 lg:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="phone"
              name="phone"
              :label="t('settings.user.form.phone')"
              :placeholder="t('settings.user.form.phonePlaceholder')"
              :modelValue="form.phone"
              readonly
            />
            <Input
              v-else
              id="phone"
              name="phone"
              v-model="form.phone"
              :label="t('settings.user.form.phone')"
              :placeholder="t('settings.user.form.phonePlaceholder')"
              :error="form.errors.get('phone')"
              :form="form"
            />
          </div>

          <!-- Role -->
          <div class="col-span-12 lg:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="role"
              name="role"
              :label="t('settings.user.form.role')"
              :placeholder="t('settings.user.form.rolePlaceholder')"
              :modelValue="form.role"
              readonly
            />
            <SingleSelect
              v-else
              id="role"
              name="role"
              v-model="form.role"
              :label="t('settings.user.form.role')"
              :options="userStore.roles"
              :placeholder="t('settings.user.form.rolePlaceholder')"
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

          <!-- Language -->
          <div class="col-span-12 lg:col-span-6">
            <InputReadonly
              v-if="isReadOnly"
              id="lang"
              name="lang"
              :label="t('settings.user.form.lang')"
              :placeholder="t('settings.user.form.langPlaceholder')"
              :modelValue="form.lang"
              readonly
            />
            <SingleSelect
              v-else
              id="lang"
              name="lang"
              v-model="form.lang"
              :label="t('settings.user.form.lang')"
              :options="languageOptions"
              :placeholder="t('settings.user.form.langPlaceholder')"
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
          <div class="col-span-12 lg:col-span-6 flex items-center">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              :disabled="isReadOnly"
              class="checkbox-primary h-5 w-5 mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-6 mt-6" v-if="!isReadOnly">
          <!-- Password -->
          <div class="col-span-12 lg:col-span-6">
            <Input
              v-model="form.password"
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              :label="t('profile.form.password')"
              :placeholder="t('profile.form.passwordPlaceholder')"
              :error="form.errors.get('password')"
              :required="context === 'create'"
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

          <!-- Password confirmation -->
          <div class="col-span-12 lg:col-span-6">
            <Input
              id="password_confirmation"
              name="password_confirmation"
              :label="t('profile.form.passwordConfirm')"
              v-model="form.password_confirmation"
              :placeholder="t('profile.form.passwordConfirmPlaceholder')"
              :type="showConfirmPassword ? 'text' : 'password'"
              :error="form.errors.get('password_confirmation')"
              :required="context === 'create'"
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
      </form>
    </template>

    <template #buttons>
      <div class="flex gap-4 items-center">
        <Button
          v-if="!isReadOnly"
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded-lg hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.cancel') }}
        </Button>

        <Button
          v-if="!isReadOnly"
          variant="primary"
          customClass="min-w-[100px] bg-primary-500 text-white px-3 rounded-lg hover:bg-primary-600 transition-all flex justify-center"
          @click="onSubmit"
          type="submit"
        >
          {{
            context === 'create' ? t('common.modal.buttons.create') : t('common.modal.buttons.save')
          }}
        </Button>

        <Button
          v-else
          variant="secondary"
          customClass="min-w-[100px] bg-gray-300 text-gray-700 px-3 rounded hover:bg-gray-400 transition-all flex justify-center"
          @click="closeModal"
        >
          {{ t('common.modal.buttons.close') }}
        </Button>
      </div>
    </template>
  </CustomModal>
</template>

<script setup>
import { Eye, EyeOff } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useSettingsUserStore, useLanguageStore } from '@/store';
const userStore = useSettingsUserStore();
const languageStore = useLanguageStore();

const form = userStore.form;
const isModalOpen = ref(false);
const context = ref('create');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const { t } = useI18n();
const emit = defineEmits(['success']);

const isReadOnly = computed(() => context.value === 'view');

const modalTitle = computed(() => {
  switch (context.value) {
    case 'create':
      return t('settings.user.modalTitleCreation');
    case 'edit':
      return t('settings.user.modalTitleModification');
    case 'view':
    default:
      return t('settings.user.modalTitleOverview');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};

const onSubmit = async () => {
  try {
    const result =
      context.value === 'create' ? await userStore.create() : await userStore.update(form.id);
    onSuccess(result);
  } catch (error) {
    onError(error);
  }
};

const onSuccess = (result) => {
  userStore.resetForm();
  closeModal();
  emit('success', result);
};

const onError = (error) => {
  console.error('Error submitting form:', error);
  isModalOpen.value = true;
};

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

const openCreateModal = async () => {
  context.value = 'create';
  userStore.resetForm();
  try {
    await userStore.requirements();
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open create modal:', err);
  }
};

const openEditModal = async (id) => {
  context.value = 'edit';
  userStore.resetForm();
  try {
    await userStore.requirements();
    await userStore.find(id, context.value);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open edit modal:', err);
  }
};

const openViewModal = async (id) => {
  context.value = 'view';
  userStore.resetForm();
  try {
    await userStore.find(id, context.value);
    isModalOpen.value = true;
  } catch (err) {
    console.error('Failed to open view modal:', err);
  }
};

defineExpose({ openCreateModal, openEditModal, openViewModal });
</script>
