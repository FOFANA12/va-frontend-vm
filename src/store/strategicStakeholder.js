import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useStrategicStakeholderStore = defineStore('strategicStakeholder', () => {
  const strategicStakeholders = ref([]);

  const form = ref(
    new Form({
      organization: '',
      responsible: '',
      email: '',
      phone: '',
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    strategicMapId: null,
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
    strategicMapId = serverParams.strategicMapId,
  } = {}) => {
    strategicStakeholders.value = [];

    Object.assign(serverParams, {
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      strategicMapId,
    });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      strategicMapId,
    };

    const { data } = await api.get(endpoints.strategicStakeholder.getAll, { params });
    strategicStakeholders.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id) => {
    try {
      const response = await api.get(endpoints.strategicStakeholder.find(id));
      Object.assign(form.value, response.data.strategic_stakeholder);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch strategic stakeholder.' };
    }
  };

  const create = async (strategicMapId) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(
        endpoints.strategicStakeholder.create(strategicMapId),
        form.value.data()
      );
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create strategic stakeholder.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.strategicStakeholder.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.stakeholder);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update strategic stakeholder.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.strategicStakeholder.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete strategic stakeholder(s).' };
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
    strategicStakeholders,
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
