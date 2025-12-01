import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useDecisionStatusStore = defineStore('decisionStatus', () => {
  const statuses = ref([]);

  const form = ref(
    new Form({
      // status_date: null,
      comment: '',
      status: null,
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    actionId: null,
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
    decisionId = serverParams.decisionId,
  } = {}) => {
    statuses.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm, decisionId });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      decisionId,
    };

    const { data } = await api.get(endpoints.decisionStatus.getAll, { params });
    statuses.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id) => {
    try {
      const response = await api.get(endpoints.decisionStatus.find(id));
      Object.assign(form.value, response.data.decision_status);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch action control.' };
    }
  };

  const create = async (decisionId) => {
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
        } else {
          formData.append(key, value);
        }
      }

      const response = await api.post(endpoints.decisionStatus.create(decisionId), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create decision status.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (decisionId, ids) => {
    try {
      const response = await api.post(endpoints.decisionStatus.destroy, {
        ids,
        decision_id: decisionId,
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete decision statuses.' };
    }
  };

  const requirements = async (decisionId) => {
    try {
      const { data } = await api.get(endpoints.decisionStatus.requirements(decisionId));
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
    statuses,
    statuses,
    form,
    meta,
    serverParams,
    getAll,
    find,
    create,
    destroy,
    requirements,
    resetForm,
    resetServerParams,
  };
});
