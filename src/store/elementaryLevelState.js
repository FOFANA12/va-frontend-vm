import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useElementaryLevelStateStore = defineStore('elementaryLevelState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (elementaryLevelId) => {
    states.value = [];

    const { data } = await api.get(endpoints.elementaryLevelState.getAll(elementaryLevelId));
    states.value = data;
  };

  const create = async (elementaryLevelId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.elementaryLevelState.create(elementaryLevelId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update elementary level state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, elementaryLevelId) => {
    try {
      const response = await api.post(endpoints.elementaryLevelState.destroy(elementaryLevelId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete elementary level states.' };
    }
  };

  const requirements = async (elementaryLevelId) => {
    try {
      const { data } = await api.get(endpoints.elementaryLevelState.requirements(elementaryLevelId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  return {
    states,
    form,
    getAll,
    create,
    destroy,
    requirements,
    resetForm,
  };
});
