import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionDomainStatusStore = defineStore('actionDomainStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (actionDomainId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.actionDomainStatus.getAll(actionDomainId));
    statuses.value = data;
  };

  const create = async (actionDomainId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.actionDomainStatus.create(actionDomainId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action domain status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, actionDomainId) => {
    try {
      const response = await api.post(endpoints.actionDomainStatus.destroy(actionDomainId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete action domain statuses.' };
    }
  };

  const requirements = async (actionDomainId) => {
    try {
      const { data } = await api.get(endpoints.actionDomainStatus.requirements(actionDomainId));
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
