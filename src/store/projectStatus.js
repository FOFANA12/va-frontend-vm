import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useProjectStatusStore = defineStore('projectStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (projectId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.projectStatus.getAll(projectId));
    statuses.value = data;
  };

  const create = async (projectId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.projectStatus.create(projectId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update project status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, projectId) => {
    try {
      const response = await api.post(endpoints.projectStatus.destroy(projectId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete project statuses.' };
    }
  };

  const requirements = async (projectId) => {
    try {
      const { data } = await api.get(endpoints.projectStatus.requirements(projectId));
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
    statuses,
    form,
    getAll,
    create,
    destroy,
    requirements,
    resetForm,
  };
});
