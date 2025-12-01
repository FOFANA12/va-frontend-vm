import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';
import moment from 'moment';

export const useSupplierEvaluationStore = defineStore('supplierEvaluation', () => {
  const supplierEvaluations = ref([]);

  const form = ref(
    new Form({
      score_delay: 0,
      score_price: 0,
      score_quality: 0,
      comment: null,
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
    supplierEvaluations.value = [];

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
    const { data } = await api.get(endpoints.supplierEvaluation.getAll, { params });
    supplierEvaluations.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.supplierEvaluation.find(id, mode));
      Object.assign(form.value, response.data.supplier_evaluation);

      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch supplier evaluation.' };
    }
  };

  const create = async (supplierId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(
        endpoints.supplierEvaluation.create(supplierId),
        form.value.data()
      );

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create supplier evaluation.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.supplierEvaluation.update(id), form.value.data());
      Object.assign(form.value, response.data.supplier_evaluation);
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update supplier evaluation.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids, supplierId) => {
    try {
      const response = await api.post(endpoints.supplierEvaluation.destroy(supplierId), { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete supplier evaluation.' };
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
    supplierEvaluations,
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
