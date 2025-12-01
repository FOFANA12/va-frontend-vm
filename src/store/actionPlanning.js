import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionPlanningStore = defineStore('actionPlanning', () => {
  const frequencyUnits = ref([]);
  const periodProgressValues = ref([]);

  const form = ref(
    new Form({
      start_date: null,
      end_date: null,
      budget: null,
      frequency_unit: null,
      frequency_value: null,
      periods: [],
    })
  );

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.actionPlanning.find(id, mode));
      Object.assign(form.value, response.data.action_planning);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch action planning.' };
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.actionPlanning.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.action_planning);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action planning.' };
    } finally {
      form.value.busy = false;
    }
  };

  const requirements = async () => {
    frequencyUnits.value = [];
    periodProgressValues.value = [];

    try {
      const response = await api.get(endpoints.actionPlanning.requirements);

      frequencyUnits.value = response.data.frequency_units;
      periodProgressValues.value = response.data.period_progress_values;

      return response.data;
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
    frequencyUnits,
    periodProgressValues,
    form,
    find,
    update,
    requirements,
    resetForm,
  };
});
