import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useCapabilityDomainStatusStore = defineStore('capabilityDomainStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (capabilityDomainId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.capabilityDomainStatus.getAll(capabilityDomainId));
    statuses.value = data;
  };

  const create = async (capabilityDomainId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.capabilityDomainStatus.create(capabilityDomainId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update capability domain status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, capabilityDomainId) => {
    try {
      const response = await api.post(endpoints.capabilityDomainStatus.destroy(capabilityDomainId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete capability domain statuses.' };
    }
  };

  const requirements = async (capabilityDomainId) => {
    try {
      const { data } = await api.get(endpoints.capabilityDomainStatus.requirements(capabilityDomainId));
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
