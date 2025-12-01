import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useSettingsCurrencyStore = defineStore('settingsCurrency', () => {
  const currencies = ref([]);
  const defaultCurrency = ref(null);

  const form = ref(
    new Form({
      name: '',
      code: '',
      status: true,
      is_default: false,
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
    currencies.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.settings.currency.getAll, { params });
    currencies.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.settings.currency.find(id, mode));
      Object.assign(form.value, response.data.currency);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch currency.' };
    }
  };

  const getDefaultCurrency = async () => {
    try {
      const { data } = await api.get(endpoints.settings.currency.getDefault);
      defaultCurrency.value = data.currency;
      return data.currency;
    } catch (error) {
      defaultCurrency.value = null;
      console.error('Failed to fetch default currency', error);
      throw error;
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    defaultCurrency.value = null;

    try {
      const response = await api.post(endpoints.settings.currency.create, form.value.data());
      
      if (response.data.currency?.is_default === true) {
        defaultCurrency.value = response.data.currency;
      }

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create currency.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    defaultCurrency.value = null;
    try {
      const response = await api.put(endpoints.settings.currency.update(id), form.value.data());

      if (response.data.currency?.is_default === true) {
        defaultCurrency.value = response.data.currency;
      }

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update currency.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.settings.currency.destroy, { ids });

      if (defaultCurrency.value && ids.includes(defaultCurrency.value.id)) {
        defaultCurrency.value = null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete currencies.' };
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
    defaultCurrency,
    currencies,
    form,
    meta,
    serverParams,
    getAll,
    find,
    getDefaultCurrency,
    create,
    update,
    destroy,
    resetForm,
    resetServerParams,
  };
});
