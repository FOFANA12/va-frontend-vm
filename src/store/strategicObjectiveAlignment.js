import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useStrategicObjectiveAlignmentStore = defineStore('strategicObjectiveAlignment', () => {
  const alignments = ref([]);
  const structures = ref([]);
  const actionPlan = ref(null);

  const form = ref(
    new Form({
      lines: [],
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    objectiveId: null,
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
    objectiveId = serverParams.objectiveId,
  } = {}) => {
    alignments.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm, objectiveId });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      objectiveId,
    };

    const { data } = await api.get(endpoints.strategicObjectiveAlignment.getAll, { params });
    alignments.value = data.data;
    meta.value = data.meta;
  };

  
  const align = async (objectiveId, selectedActions) => {
    form.value.clear();
    form.value.busy = true;

    try {
      form.value.lines = selectedActions.map((a) => ({
        action: a.uuid,
        name: a.name,
      }));

      const response = await api.post(endpoints.strategicObjectiveAlignment.align(objectiveId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to align actions to strategic objective.' };
    } finally {
      form.value.busy = false;
    }
  };

  const unalign = async (ids) => {
    try {
      const { data } = await api.post(endpoints.strategicObjectiveAlignment.unalign, { ids });
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to unalign actions.' };
    }
  };

  
  const getStructures = async () => {
    structures.value = [];

    try {
      const { data } = await api.get(endpoints.strategicObjectiveAlignment.getStructures);
      structures.value = data.structures;
      return data;
    } catch (error) {
      throw { message: 'Failed to load structures.' };
    }
  };

  const getActions = async (structureId, objectiveId) => {
    actionPlan.value = null;

    try {
      const { data } = await api.get(endpoints.strategicObjectiveAlignment.getActions(structureId, objectiveId));
      actionPlan.value = data.action_plan;
      return data;
    } catch (error) {
      throw { message: 'Failed to load action plan.' };
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
    alignments,
    actionPlan,
    structures,
    form,
    meta,
    serverParams,
    getAll,
    align,
    unalign,
    getStructures,
    getActions,
    resetForm,
    resetServerParams,
  };
});
