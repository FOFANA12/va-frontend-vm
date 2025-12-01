import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionFundDisbursementStore = defineStore('actionFundDisbursement', () => {
  const actionFundDisbursements = ref([]);
  const actions = ref([]);
  const paymentModes = ref([]);
  const budgetTypes = ref([]);
  const expenseTypes = ref([]);
  const phases = ref([]);
  const tasks = ref([]);

  const suppliers = ref([]);

  const form = ref(
    new Form({
      action: '',
      reference: '',
      contract_number: '',
      operation_number: '',
      supplier_name: '',
      tax_number: '',
      signature_date: '',
      execution_date: '',
      payment_date: '',
      payment_amount: null,
      payment_mode: '',
      cheque_reference: '',
      budget_type: '',
      phase: '',
      task: '',
      description: '',
      expense_types: [],
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
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
  } = {}) => {
    actionFundDisbursements.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.actionFundDisbursement.getAll, { params });
    actionFundDisbursements.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.actionFundDisbursement.find(id, mode));
      Object.assign(form.value, response.data.disbursement);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch disbursement.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(form.value.data())) {
        if (value == null) continue;

        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const response = await api.post(endpoints.actionFundDisbursement.create, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create disbursement.' };
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
        } else if (Array.isArray(value) || typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
      
      formData.append('_method', 'PUT');

      const response = await api.post(endpoints.actionFundDisbursement.update(id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      resetForm();
      Object.assign(form.value, response.data.disbursement);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update disbursement.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.actionFundDisbursement.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete disbursements.' };
    }
  };

  const requirements = async (mode = 'create') => {
    budgetTypes.value = [];
    expenseTypes.value = [];
    actions.value = [];
    paymentModes.value = [];
    phases.value = [];
    tasks.value = [];

    suppliers.value = [];
    try {
      const { data } = await api.get(endpoints.actionFundDisbursement.requirements(mode));
      if (data.actions) actions.value = data.actions;
      paymentModes.value = data.payment_modes;
      phases.value = data.phases ?? [];
      tasks.value = data.tasks ?? [];
      budgetTypes.value = data.budget_types ?? [];
      expenseTypes.value = data.expense_types ?? [];
      suppliers.value = data.suppliers ?? [];
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
    actionFundDisbursements,
    actions,
    suppliers,
    phases,
    tasks,
    paymentModes,
    budgetTypes,
    expenseTypes,
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
