import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useProgramStatusStore = defineStore('programStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (programId) => {
    statuses.value = [];

    const { data } = await api.get(endpoints.programStatus.getAll(programId));
    statuses.value = data;
  };

  const create = async (programId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.programStatus.create(programId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update program status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, programId) => {
    try {
      const response = await api.post(endpoints.programStatus.destroy(programId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete program statuses.' };
    }
  };

  const requirements = async (programId) => {
    try {
      const { data } = await api.get(endpoints.programStatus.requirements(programId));
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
