import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useMatrixPeriodStore = defineStore('matrixPeriod', () => {
  const matrixPeriods = ref([]);

  const strategicAxes = ref([]);

  const form = ref(
    new Form({
      start_date: '',
      end_date: '',
    })
  );

  const getMatrixPeriods = async (strategicMapId) => {
    try {
      const response = await api.get(endpoints.matrixPeriod.getMatrixPeriods(strategicMapId));
      matrixPeriods.value = response.data.matrix_periods || [];
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch matrix periods.' };
    }
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.matrixPeriod.find(id, mode));
      resetForm();
      Object.assign(form.value, response.data.matrix_period);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch matrix period.' };
    }
  };

  const create = async (strategicMapId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(
        endpoints.matrixPeriod.create(strategicMapId),
        form.value.data()
      );
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create matrix period.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.matrixPeriod.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.matrix_period);
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update matrix period.' };
    } finally {
      form.value.busy = false;
    }
  };

  const attachObjectives = async (id, objectives) => {
    try {
      const response = await api.post(endpoints.matrixPeriod.attachObjectives(id), {
        objectives: objectives,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to attach objectives to matrix period.' };
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(endpoints.matrixPeriod.destroy(id));
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete matrix periods.' };
    }
  };

  const availableObjectives = async (strategicMapId, matrixPeriodId) => {
    strategicAxes.value = [];
    try {
      const response = await api.get(
        endpoints.matrixPeriod.availableObjectives(strategicMapId, matrixPeriodId)
      );
      strategicAxes.value = response.data.strategic_axes || [];

      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to load available objectives.' };
    }
  };

  const detachObjective = async (matrixPeriodId, objectiveId) => {
    try {
      const response = await api.delete(
        endpoints.matrixPeriod.detachObjective(matrixPeriodId, objectiveId)
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to detach objective from matrix period.' };
    }
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  return {
    matrixPeriods,
    strategicAxes,
    form,
    getMatrixPeriods,
    find,
    create,
    update,
    attachObjectives,
    destroy,
    availableObjectives,
    detachObjective,
    resetForm,
  };
});
