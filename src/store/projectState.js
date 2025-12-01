import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useProjectStateStore = defineStore('projectState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (projectId) => {
    states.value = [];

    const { data } = await api.get(endpoints.projectState.getAll(projectId));
    states.value = data;
  };

  const create = async (projectId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.projectState.create(projectId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update project state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, projectId) => {
    try {
      const response = await api.post(endpoints.projectState.destroy(projectId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete project states.' };
    }
  };

  const requirements = async (projectId) => {
    try {
      const { data } = await api.get(endpoints.projectState.requirements(projectId));
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
