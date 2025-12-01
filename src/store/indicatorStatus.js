import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useIndicatorStatusStore = defineStore('indicatorStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (indicatorId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.indicatorStatus.getAll(indicatorId));
    statuses.value = data;
  };

  const create = async (indicatorId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.indicatorStatus.create(indicatorId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update indicator status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, indicatorId) => {
    try {
      const response = await api.post(endpoints.indicatorStatus.destroy(indicatorId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete indicator statuses.' };
    }
  };

  const requirements = async (indicatorId) => {
    try {
      const { data } = await api.get(endpoints.indicatorStatus.requirements(indicatorId));
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
