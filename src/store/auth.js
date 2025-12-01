import { defineStore } from 'pinia';
import { ref } from 'vue';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const token = ref(null);
  const isInitialized = ref(false);
  const form = ref(new Form({}));

  const hasRole = (roles = []) => {
    const userRole = user.value?.role?.name;
    return roles.length === 0 || roles.includes(userRole);
  };

  const setUser = (newUser) => {
    console.log(newUser);
    user.value = newUser;
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  const login = async () => {
    form.value.clear();
    form.value.busy = true;

    try {
      await api.get(endpoints.auth.initCsrf);
      const resp = await api.post(endpoints.auth.login, form.value.data());
      isAuthenticated.value = true;
      user.value = resp.data.user;
      console.log(user.value);
      return resp;
    } catch (error) {
      form.value.errors.set(error.response.data?.errors);
      isAuthenticated.value = false;
      user.value = null;
      throw error;
    } finally {
      form.value.busy = false;
    }
  };

  const forgetPassword = async () => {
    form.value.clear();
    form.value.busy = true;

    try {
      const resp = await api.post(endpoints.auth.forgotPassword, form.value.data());
      form.value.reset();
      form.value.clear();
      return resp;
    } catch (error) {
      form.value.errors.set(error.response.data?.errors);
      throw error;
    } finally {
      form.value.busy = false;
    }
  };

  const resetPassword = async () => {
    form.value.clear();
    form.value.busy = true;

    try {
      const resp = await api.post(endpoints.auth.resetPassword, form.value.data());
      return resp;
    } catch (error) {
      form.value.errors.set(error.response.data?.errors);
      throw error;
    } finally {
      form.value.busy = false;
    }
  };

  const logout = async () => {
    try {
      const resp = await api.post(endpoints.auth.logout);
      isAuthenticated.value = false;
      user.value = null;
      return resp;
    } catch (error) {
      throw error;
    }
  };

  const checkUser = async () => {
    try {
      const resp = await api.get(endpoints.profile.getProfile);
      isAuthenticated.value = true;
      user.value = resp.data.user;
      return resp;
    } catch (error) {
      isAuthenticated.value = false;
      user.value = null;
      throw error;
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      isInitialized.value = true;
    }
  };

  return {
    isAuthenticated,
    user,
    token,
    form,
    isInitialized,
    hasRole,
    setUser,
    login,
    forgetPassword,
    resetPassword,
    logout,
    checkUser,
    resetForm,
  };
});
