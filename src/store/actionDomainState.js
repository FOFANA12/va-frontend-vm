import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionDomainStateStore = defineStore('actionDomainState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (actionDomainId) => {
    states.value = [];

    const { data } = await api.get(endpoints.actionDomainState.getAll(actionDomainId));
    states.value = data;
  };

  const create = async (actionDomainId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.actionDomainState.create(actionDomainId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action domain state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, actionDomainId) => {
    try {
      const response = await api.post(endpoints.actionDomainState.destroy(actionDomainId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete action domain states.' };
    }
  };

  const requirements = async (actionDomainId) => {
    try {
      const { data } = await api.get(endpoints.actionDomainState.requirements(actionDomainId));
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
