import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';
import moment from 'moment';

export const useContractStore = defineStore('contract', () => {
  const contracts = ref([]);

  const form = ref(
    new Form({
      contract_number: null,
      title: null,
      start_date: null,
      end_date: null,
      amount: null,
      signed_at: moment().format('YYYY-MM-DD'),
      description: null,
      status: true,
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
    supplierId: null,
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
    supplierId = serverParams.supplierId,
  } = {}) => {
    contracts.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm, supplierId });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    if (supplierId) {
      params.supplierId = supplierId;
    }
    const { data } = await api.get(endpoints.contract.getAll, { params });
    contracts.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.contract.find(id, mode));
      Object.assign(form.value, response.data.contract);

      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch contract.' };
    }
  };

  const create = async (supplierId) => {
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

      const response = await api.post(endpoints.contract.create(supplierId), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create contract.' };
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

      const response = await api.post(endpoints.contract.update(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      resetForm();
      Object.assign(form.value, response.data.contract);
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update contract.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.contract.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete contract.' };
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
    contracts,
    form,
    meta,
    serverParams,
    getAll,
    find,
    create,
    update,
    destroy,
    resetForm,
    resetServerParams,
  };
});
