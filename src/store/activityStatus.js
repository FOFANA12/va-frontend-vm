import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActivityStatusStore = defineStore('activityStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (activityId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.activityStatus.getAll(activityId));
    statuses.value = data;
  };

  const create = async (activityId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.activityStatus.create(activityId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update activity status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, activityId) => {
    try {
      const response = await api.post(endpoints.activityStatus.destroy(activityId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete activity statuses.' };
    }
  };

  const requirements = async (activityId) => {
    try {
      const { data } = await api.get(endpoints.activityStatus.requirements(activityId));
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
