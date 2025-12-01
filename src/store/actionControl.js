import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';
import moment from 'moment';

export const useActionControlStore = defineStore('actionControl', () => {
  const actionControls = ref([]);
  const action = ref(null);
  const period = ref(null);
  const phases = ref([]);
  const progressValues = ref([]);

  const form = ref(
    new Form({
      root_cause: '',
      control_date: moment().format('YYYY-MM-DD'),
      file: null,
      delete_file: true,
      items: [],
    })
  );

  const getAll = async (actionId) => {
    actionControls.value = [];

    const { data } = await api.get(endpoints.actionControl.getAll(actionId));
    actionControls.value = data;
  };
  const find = async (id) => {
    try {
      const response = await api.get(endpoints.actionControl.find(id));
      Object.assign(form.value, response.data.action_control);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch action control.' };
    }
  };

  const create = async (periodId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const payload = {
        root_cause: form.value.root_cause,
        control_date: form.value.control_date,
        file: form.value.file,
        delete_file: form.value.delete_file,
        items: phases.value.map((p) => ({
          phase: p.uuid,
          progress_percent: p.progress_percent,
        })),
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

      const response = await api.post(endpoints.actionControl.create(periodId), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create action control.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(endpoints.actionControl.destroy(id));
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete action controls.' };
    }
  };

  const requirements = async (actionPeriodId) => {
    action.value = null;
    period.value = null;
    phases.value = [];
    progressValues.value = [];

    try {
      const { data } = await api.get(endpoints.actionControl.requirements(actionPeriodId));
      action.value = data.action;
      period.value = data.period;
      phases.value = data.phases ?? [];
      progressValues.value = data.progress_values;
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
    actionControls,
    action,
    period,
    phases,
    progressValues,
    form,
    getAll,
    find,
    create,
    destroy,
    requirements,
    resetForm,
  };
});
