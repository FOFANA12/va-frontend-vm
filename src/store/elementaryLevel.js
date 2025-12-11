import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useElementaryLevelStore = defineStore('elementaryLevel', () => {
  const elementaryLevels = ref([]);
  const capabilityDomains = ref([]);
  const responsibles = ref([]);
  const beneficiaries = ref([]);
  const fundingSources = ref([]);

  const defaultCurrency = ref(null);

  const form = ref(
    new Form({
      reference: '',
      name: '',
      description: '',
      prerequisites: '',
      impacts: '',
      risks: '',
      start_date: '',
      end_date: '',
      currency: '',
      capability_domain: '',
      responsible: null,

      funding_sources: [],
      beneficiaries: [],
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
    elementaryLevels.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.elementaryLevel.getAll, { params });
    elementaryLevels.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.elementaryLevel.find(id, mode));
      Object.assign(form.value, response.data.elementary_level);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch elementary level.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.elementaryLevel.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create elementary level.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.elementaryLevel.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.elementary_level);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update elementary level.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.elementaryLevel.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete elementary level.' };
    }
  };

  const requirements = async () => {
    responsibles.value = [];
    capabilityDomains.value = [];
    beneficiaries.value = [];
    fundingSources.value = [];
    defaultCurrency.value = null;

    try {
      const { data } = await api.get(endpoints.elementaryLevel.requirements);
      responsibles.value = data.responsibles;
      capabilityDomains.value = data.capability_domains;
      beneficiaries.value = data.beneficiaries;
      fundingSources.value = data.funding_sources;
      defaultCurrency.value = data.currency;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getGlobalReport = async (elementaryLevelId) => {
    try {
      const { data } = await api.get(endpoints.elementaryLevel.getGlobalReport(elementaryLevelId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load report.' };
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
    elementaryLevels,
    capabilityDomains,
    defaultCurrency,
    responsibles,
    beneficiaries,
    fundingSources,
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
    getGlobalReport
  };
});
