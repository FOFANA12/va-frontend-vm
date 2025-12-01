import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionAlignmentStore = defineStore('actionAlignment', () => {
  const alignments = ref([]);
  const structures = ref([]);

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
    actionId = serverParams.actionId,
  } = {}) => {
    alignments.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm, actionId });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      actionId,
    };

    const { data } = await api.get(endpoints.actionAlignment.getAll, { params });
    alignments.value = data.data;
    meta.value = data.meta;
  };

  const align = async (actionId, selectedObjectives) => {
    form.value.clear();
    form.value.busy = true;

    try {
      form.value.lines = selectedObjectives.map((o) => ({
        objective: o.uuid,
        name: o.name,
      }));

      const response = await api.post(endpoints.actionAlignment.align(actionId), form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to align objectives to action.' };
    } finally {
      form.value.busy = false;
    }
  };

  const unalign = async (ids) => {
    try {
      const { data } = await api.post(endpoints.actionAlignment.unalign, { ids });
      return data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to unalign objectives.' };
    }
  };

  const requirements = async (actionId) => {
    structures.value = [];

    try {
      const { data } = await api.get(endpoints.actionAlignment.requirements(actionId));
      structures.value = data.structures || [];
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
    alignments,
    structures,
    form,
    meta,
    serverParams,
    getAll,
    align,
    unalign,
    requirements,
    resetForm,
    resetServerParams,
  };
});
