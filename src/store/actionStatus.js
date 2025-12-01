import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionStatusStore = defineStore('actionStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (actionId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.actionStatus.getAll(actionId));
    statuses.value = data;
  };

  const create = async (actionId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.actionStatus.create(actionId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, actionId) => {
    try {
      const response = await api.post(endpoints.actionStatus.destroy(actionId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete action statuses.' };
    }
  };

  const requirements = async (actionId) => {
    try {
      const { data } = await api.get(endpoints.actionStatus.requirements(actionId));
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
