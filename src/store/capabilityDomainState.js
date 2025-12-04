import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useCapabilityDomainStateStore = defineStore('capabilityDomainState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (capabilityDomainId) => {
    states.value = [];

    const { data } = await api.get(endpoints.capabilityDomainState.getAll(capabilityDomainId));
    states.value = data;
  };

  const create = async (capabilityDomainId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.capabilityDomainState.create(capabilityDomainId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update capability domain state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, capabilityDomainId) => {
    try {
      const response = await api.post(endpoints.capabilityDomainState.destroy(capabilityDomainId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete capability domain states.' };
    }
  };

  const requirements = async (capabilityDomainId) => {
    try {
      const { data } = await api.get(endpoints.capabilityDomainState.requirements(capabilityDomainId));
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
