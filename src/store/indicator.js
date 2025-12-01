import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useIndicatorStore = defineStore('indicator', () => {
  const indicators = ref([]);

  const structures = ref([]);
  const strategicMaps = ref([]);
  const chartTypes = ref([]);
  const frequencyUnits = ref([]);
  const categories = ref([]);

  const statuses = ref([]);

  const form = ref(
    new Form({
      structure: '',
      strategic_map: '',
      strategic_element: '',
      strategic_objective: '',
      category: '',
      name: '',
      description: '',
      chart_type: '',
      frequency_unit: '',
      frequency_value: '',
      initial_value: '',
      final_tartget_value: '',
      unit: '',
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
    indicators.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.indicator.getAll, { params });
    indicators.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.indicator.find(id, mode));
      Object.assign(form.value, response.data.indicator);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch indicator.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.indicator.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create indicator.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.indicator.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.indicator);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update indicator.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.indicator.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete indicators.' };
    }
  };

  const requirements = async () => {
    structures.value = [];
    strategicMaps.value = [];
    categories.value = [];
    frequencyUnits.value = [];
    chartTypes.value = [];

    try {
      const { data } = await api.get(endpoints.indicator.requirements);
      structures.value = data.structures;
      strategicMaps.value = data.strategic_maps;
      categories.value = data.categories ?? [];
      frequencyUnits.value = data.frequency_units;
      chartTypes.value = data.chart_types;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getStatuses = async () => {
    try {
      const response = await api.get(endpoints.indicator.statuses);
      statuses.value = response.data.statuses;
      return response.data;
    } catch (error) {
      throw { message: 'Failed to load statuses.' };
    }
  };

  const updateStatus = async (id, payload) => {
    try {
      const response = await api.put(endpoints.indicator.updateStatus(id), payload);
      if (form.value.id === id) {
        form.value.status = response.data.status;
        form.value.status_changed_at = response.data.status_changed_at;
        form.value.status_changed_by = response.data.status_changed_by;
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update status.' };
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
    indicators,
    structures,
    strategicMaps,
    categories,
    frequencyUnits,
    chartTypes,
    form,
    meta,
    serverParams,
    statuses,
    getAll,
    find,
    create,
    update,
    destroy,
    requirements,
    resetForm,
    resetServerParams,
    getStatuses,
    updateStatus,
  };
});
