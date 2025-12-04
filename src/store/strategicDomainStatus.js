import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useStrategicDomainStatusStore = defineStore('strategicDomainStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (strategicDomainStatusId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.strategicDomainStatus.getAll(strategicDomainStatusId));
    statuses.value = data;
  };

  const create = async (strategicDomainStatusId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.strategicDomainStatus.create(strategicDomainStatusId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update strategic domain status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, strategicDomainStatusId) => {
    try {
      const response = await api.post(endpoints.strategicDomainStatus.destroy(strategicDomainStatusId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete strategic domain statuses.' };
    }
  };

  const requirements = async (strategicDomainStatusId) => {
    try {
      const { data } = await api.get(endpoints.strategicDomainStatus.requirements(strategicDomainStatusId));
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
