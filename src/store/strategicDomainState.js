import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useStrategicDomainStateStore = defineStore('strategicDomainState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (strategicDomainStateId) => {
    states.value = [];

    const { data } = await api.get(endpoints.strategicDomainState.getAll(strategicDomainStateId));
    states.value = data;
  };

  const create = async (strategicDomainStateId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.strategicDomainState.create(strategicDomainStateId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update strategic domain state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, strategicDomainStateId) => {
    try {
      const response = await api.post(endpoints.strategicDomainState.destroy(strategicDomainStateId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete strategic domain states.' };
    }
  };

  const requirements = async (strategicDomainStateId) => {
    try {
      const { data } = await api.get(endpoints.strategicDomainState.requirements(strategicDomainStateId));
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
