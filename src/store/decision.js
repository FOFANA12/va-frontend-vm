import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useDecisionStore = defineStore('contract', () => {
  const decisions = ref([]);
  const priorityLevels = ref([]);
  const canHaveDecision = ref(false);

  const form = ref(
    new Form({
      decision_date: null,
      title: null,
      priority: null,
      description: null,
      file: null,
      delete_file: true,
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    decidableType: null,
    decidableId: null,
  });

  const meta = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  const getAll = async ({
    pageIndex = serverParams.pageIndex,
    pageSize = serverParams.pageSize,
    sortBy = serverParams.sortBy,
    sortOrder = serverParams.sortOrder,
    searchTerm = serverParams.searchTerm,
    decidableType = serverParams.decidableType,
    decidableId = serverParams.decidableId,
  } = {}) => {
    decisions.value = [];

    Object.assign(serverParams, {
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      decidableType,
      decidableId,
    });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      decidableType,
      decidableId,
    };

    const { data } = await api.get(endpoints.decision.getAll, { params });
    decisions.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.decision.find(id, mode));
      Object.assign(form.value, response.data.decision);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch decision.' };
    }
  };

  const create = async (decidableType, decidableId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      form.value.decidable_type = decidableType;
      form.value.decidable_id = decidableId;

      const formData = new FormData();

      for (const [key, value] of Object.entries(form.value.data())) {
        if (value == null) continue;
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const response = await api.post(endpoints.decision.create, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create decision.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(form.value.data())) {
        if (value == null) continue;

        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? 1 : 0);
        } else {
          formData.append(key, value);
        }
      }
      formData.append('_method', 'PUT');

      const response = await api.post(endpoints.decision.update(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      resetForm();
      Object.assign(form.value, response.data.decision);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update decision.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.decision.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete decisions.' };
    }
  };

  const requirements = async (decidableType, decidableId) => {
    priorityLevels.value = [];
    canHaveDecision.value = false;

    try {
      const params = {
        decidableType,
        decidableId,
      };

      const { data } = await api.get(endpoints.decision.requirements, { params });

      priorityLevels.value = data.priority_levels;
      canHaveDecision.value = data.can_have_decision;

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

  const resetServerParams = () => {
    Object.assign(serverParams, {
      pageIndex: 0,
      pageSize: 10,
      sortBy: 'id',
      sortOrder: 'desc',
      searchTerm: '',
    });

    meta.value = {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0,
    };
  };

  return {
    decisions,
    priorityLevels,
    canHaveDecision,
    form,
    meta,
    serverParams,
    getAll,
    find,
    create,
    update,
    destroy,
    requirements,
    resetForm,
    resetServerParams,
  };
});
