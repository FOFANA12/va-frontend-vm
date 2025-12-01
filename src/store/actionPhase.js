import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionPhaseStore = defineStore('actionPhase', () => {
  const phases = ref([]);

  const form = ref(
    new Form({
      name: null,
      number: null,
      start_date: null,
      end_date: null,
      weight: '',
      description: '',
      deliverable: '',
    })
  );

  const getAll = async (actionId) => {
    phases.value = [];

    const { data } = await api.get(endpoints.actionPhase.getAll(actionId));
    phases.value = data;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.actionPhase.find(id, mode));
      Object.assign(form.value, response.data.action_phase);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch action phase.' };
    }
  };

  const create = async (actionId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.actionPhase.create(actionId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create action phase.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (actionId, phaseId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(
        endpoints.actionPhase.update(actionId, phaseId),
        form.value.data()
      );
      resetForm();
      Object.assign(form.value, response.data.action_phase);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action phase.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(endpoints.actionPhase.destroy(id));
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete action phase.' };
    }
  };

  const requirements = async () => {
    try {
      const { data } = await api.get(endpoints.actionPhase.requirements);
      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const initializeDefaultPhases = async (actionId) => {
    try {
      const { data } = await api.post(endpoints.actionPhase.initialize(actionId));
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to initialize default phases.' };
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
    initializeDefaultPhases,
    resetForm,
  };
});
