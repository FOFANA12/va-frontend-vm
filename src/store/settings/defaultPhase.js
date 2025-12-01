import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useDefaultPhaseStore = defineStore('defaultPhase', () => {
  const phases = ref([]);

  const form = ref(
    new Form({
      name: null,
      number: null,
      duration: null,
      weight: '',
    })
  );

  const getAll = async () => {
    phases.value = [];

    const { data } = await api.get(endpoints.settings.defaultPhase.getAll);
    phases.value = data;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.settings.defaultPhase.find(id, mode));
      Object.assign(form.value, response.data.default_phase);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch default phase.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.settings.defaultPhase.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create default phase.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (phaseId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(
        endpoints.settings.defaultPhase.update(phaseId),
        form.value.data()
      );
      resetForm();
      Object.assign(form.value, response.data.default_phase);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update default phase.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(endpoints.settings.defaultPhase.destroy(id));
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete default phase.' };
    }
  };

  const requirements = async () => {
    try {
      const { data } = await api.get(endpoints.settings.defaultPhase.requirements);
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
    phases,
    form,
    getAll,
    find,
    create,
    update,
    destroy,
    requirements,
    resetForm,
  };
});
