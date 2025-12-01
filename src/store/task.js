import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);

  const form = ref(
    new Form({
      title: null,
      description: null,
      priority: null,
      start_date: null,
      end_date: null,
      assigned_to: null,
      deliverable: null,
      is_completed: false,
    })
  );

  const find = async (id, mode = 'edit') => {
    try {
      const { data } = await api.get(endpoints.phaseTask.find(id, mode));
      Object.assign(form.value, data.task);
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to load the task.' };
    }
  };

  const create = async (actionPhaseId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.phaseTask.create(actionPhaseId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create the task.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (taskId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.phaseTask.update(taskId), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.task);
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update the task.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (taskId) => {
    try {
      const { data } = await api.delete(endpoints.phaseTask.destroy(taskId));
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete the task.' };
    }
  };

  const requirements = async (actionId) => {
    try {
      const { data } = await api.get(endpoints.phaseTask.requirements(actionId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const toggle = async (taskId) => {
    try {
      const { data } = await api.patch(endpoints.phaseTask.toggle(taskId));
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to toggle task status.' };
    }
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  return {
    tasks,
    form,
    find,
    create,
    update,
    destroy,
    toggle,
    requirements,
    resetForm,
  };
});
