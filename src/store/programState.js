import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useProgramStateStore = defineStore('programState', () => {
  const states = ref([]);

  const form = ref(
    new Form({
      status: null,
    })
  );

  const getAll = async (programId) => {
    states.value = [];

    const { data } = await api.get(endpoints.programState.getAll(programId));
    states.value = data;
  };

  const create = async (programId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.programState.create(programId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update program state.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, programId) => {
    try {
      const response = await api.post(endpoints.programState.destroy(programId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete program states.' };
    }
  };

  const requirements = async (programId) => {
    try {
      const { data } = await api.get(endpoints.programState.requirements(programId));
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
