import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useStrategicObjectiveStore = defineStore('strategicObjective', () => {
  const strategicObjectives = ref([]);

  const structures = ref([]);
  const leadStructures = ref([]);
  const strategicMaps = ref([]);
  const strategicElements = ref([]);
  const priorities = ref([]);
  const riskLevels = ref([]);
  const statuses = ref([]);

  const form = ref(
    new Form({
      name: '',
      structure: '',
      strategic_map: '',
      strategic_element: '',
      lead_structure: '',
      start_date: '',
      due_date: '',
      description: '',
      risk_level: '',
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
    strategicObjectives.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.strategicObjective.getAll, { params });
    strategicObjectives.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.strategicObjective.find(id, mode));
      Object.assign(form.value, response.data.strategic_objective);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch strategic objective.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.strategicObjective.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create strategic objective.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.strategicObjective.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.strategic_objective);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update strategic objective.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.strategicObjective.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete strategic objective.' };
    }
  };

  const requirements = async () => {
    structures.value = [];
    leadStructures.value = [];
    strategicMaps.value = [];
    strategicElements.value = [];
    priorities.value = [];
    riskLevels.value = [];
   
    try {
      const { data } = await api.get(endpoints.strategicObjective.requirements);
      structures.value = data.structures;
      leadStructures.value = data.lead_structures;
      strategicMaps.value = data.strategic_maps;
      strategicElements.value = data.strategic_elements ?? [];
      priorities.value = data.priority_levels;
      riskLevels.value = data.risk_levels;
   
      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getStatuses = async (id) => {
    try {
      const response = await api.get(endpoints.strategicObjective.statuses(id));
      statuses.value = response.data.statuses;
      return response.data;
    } catch (error) {
      throw { message: 'Failed to load statuses.' };
    }
  };

  const updateStatus = async (id, payload) => {
    try {
      const response = await api.put(endpoints.strategicObjective.updateStatus(id), payload);
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
    strategicObjectives,
    structures,
    leadStructures,
    strategicMaps,
    strategicElements,
    priorities,
    riskLevels,
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
    updateStatus
  };
});
