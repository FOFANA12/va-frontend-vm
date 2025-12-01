import { defineStore } from 'pinia';
import { ref } from 'vue';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useProfileStore = defineStore('profile', () => {
  const form = ref(new Form({}));

  const getProfile = async () => {
    try {
      const response = await api.get(endpoints.profile.getProfile);
      const user = response.data.user;
      if (user.is_employee && user.employee) {
        Object.assign(user, user.employee);
        delete user.employee;
      }
      Object.assign(form.value, user);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateProfile = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.profile.updateProfile, form.value.data());
      resetForm();
      const user = response.data.user;
      if (user.is_employee && user.employee) {
        Object.assign(user, user.employee);
      }
      Object.assign(form.value, user);
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update profil.' };
    } finally {
      form.value.busy = false;
    }
  };

  const getRequirements = async () => {
    try {
      const resp = await api.get(endpoints.profile.getRequirements);
      return resp.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to load profile requirements.' };
    }
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  return {
    form,
    getProfile,
    updateProfile,
    getRequirements,
    resetForm,
  };
});
