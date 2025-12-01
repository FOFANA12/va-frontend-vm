<template>
  <FullScreenLayout>
    <div class="min-h-screen flex flex-col items-center justify-center px-4">
      <div
        v-if="alert.type && alert.message"
        class="w-full px-4 max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lg mb-0"
      >
        <Alert :type="alert.type" :message="alert.message" @close="handleCloseAlert" />
      </div>

      <div class="w-full max-w-sm flex flex-col items-center">
        <div class="text-center mb-3">
          <img :src="logo" alt="Logo" class="h-14 mx-auto mb-0 pb-0" />
        </div>

        <div class="w-full bg-white px-6 py-7 rounded-xl border app-border-color">
          <div class="mb-5 sm:mb-8">
            <h1 class="mb-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
              {{ t('login.title') }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ t('login.subtitle') }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" @keydown="form.onKeydown($event)" class="space-y-4">
            <div class="mb-6">
              <label
                for="email"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                {{ t('login.form.email') }}<span class="required-star">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail :size="18" />
                </span>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  name="email"
                  :placeholder="t('login.form.emailPlaceholder')"
                  :class="[
                    'w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-gray-800 bg-transparent border focus:outline-none',
                    form.errors.has('email')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-gray-300 focus:border-primary-300 focus:ring-primary-500/10',
                  ]"
                />
              </div>
              <HasError :form="form" field="email" class="text-red-500 text-xs" />
            </div>

            <!-- Password -->
            <div class="mb-6">
              <label
                for="password"
                class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                {{ t('login.form.password') }}<span class="required-star">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock :size="18" />
                </span>
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  :placeholder="t('login.form.passwordPlaceholder')"
                  :class="[
                    'w-full pl-10 pr-11 py-2.5 rounded-lg text-sm text-gray-800 bg-transparent border focus:outline-none',
                    form.errors.has('password')
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                      : 'border-gray-300 focus:border-primary-300 focus:ring-primary-500/10',
                  ]"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <EyeOff v-if="showPassword" :size="18" />
                  <Eye v-else :size="18" />
                </button>
              </div>
              <HasError :form="form" field="password" class="text-red-500 text-xs" />
            </div>

            <!-- Forgot password link -->
            <div class="flex items-center justify-end mb-6 mt-3">
              <router-link
                :to="{ name: 'forgot-password' }"
                class="text-sm text-primary-500 hover:text-primary-600 dark:text-primary-400"
              >
                {{ t('login.form.forgotPasswordLink') }}
              </router-link>
            </div>

            <div class="flex justify-center">
              <SubmitButton
                :busy="form.busy"
                block
                customClass="w-full sm:w-8/12 bg-primary-500 py-2.5 text-white rounded-lg hover:bg-primary-600 transition duration-150 flex items-center justify-center"
              >
                <template #default>
                  <LogIn class="w-5 h-5 mr-2" />
                  {{ t('login.form.btnSubmit') }}
                </template>

                <template #loading>
                  {{ t('common.buttons.processing') }}
                </template>
              </SubmitButton>
            </div>
          </form>
        </div>
        <AuthFooter class="mb-3" />
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup>
import { useAuthStore } from '@/store';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-vue-next';
import logo from '@/assets/images/logo.png';
import AuthFooter from './components/AuthFooter.vue';

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const showPassword = ref(false);

store.resetForm();
const form = store.form;
form.email = null;
form.password = null;
const alert = ref({ type: null, message: null });

const handleCloseAlert = () => {
  alert.value = { type: null, message: null };
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  if (route.query.message) {
    alert.value = {
      type: route.query.type ?? 'info',
      message: route.query.message,
    };

    router.replace({
      ...route,
      query: Object.fromEntries(
        Object.entries(route.query).filter(([key]) => !['message', 'type'].includes(key))
      )
    });
  }
});

const handleSubmit = async () => {
  alert.value = { type: null, message: null };

  try {
    await store.login();
    const redirect = route.query.redirect || '/';
    router.push(redirect);
  } catch (error) {
    if (error?.response?.data?.message) {
      alert.value = {
        type: 'error',
        message: error?.response?.data?.message || t('login.failed'),
      };
    }
  }
};
</script>
