import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';
import moment from 'moment';

export const useIndicatorControlStore = defineStore('indicatorControl', () => {
  const indicatorControls = ref([]);
  const period = ref([]);

  const indicator = ref(null);

  const form = ref(
    new Form({
      indicator_period: null,
      root_cause: '',
      control_date: moment().format('YYYY-MM-DD'),
      file: null,
      delete_file: true,
      target_value: null,
      achieved_value: null,
    })
  );

  const getAll = async (indicatorId) => {
    indicatorControls.value = [];

    const { data } = await api.get(endpoints.indicatorControl.getAll(indicatorId));
    indicatorControls.value = data;
  };
  const find = async (id) => {
    try {
      const response = await api.get(endpoints.indicatorControl.find(id));
      Object.assign(form.value, response.data.indicator_control);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch indicator control.' };
    }
  };

  const create = async (indicatorPeriodId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const payload = {
        root_cause: form.value.root_cause,
        indicator_period: form.value.indicator_period,
        control_date: form.value.control_date,
        file: form.value.file,
        delete_file: form.value.delete_file,
        target_value: form.value.target_value,
        achieved_value: form.value.achieved_value,
      };

      const formData = new FormData();

      for (const [key, value] of Object.entries(payload)) {
        if (value == null) continue;

        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const response = await api.post(
        endpoints.indicatorControl.create(indicatorPeriodId),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create indicator control.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(endpoints.indicatorControl.destroy(id));
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete indicator controls.' };
    }
  };

  const requirements = async (indicatorId) => {
    indicator.value = null;
    period.value = null;

    try {
      const { data } = await api.get(endpoints.indicatorControl.requirements(indicatorId));
      indicator.value = data.indicator;
      period.value = data.period;
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
    indicatorControls,
    indicator,
    period,
    form,
    getAll,
    find,
    create,
    destroy,
    requirements,
    resetForm,
  };
});
