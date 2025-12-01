import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([]);
  const structures = ref([]);
  const roles = ref([]);

  const form = ref(
    new Form({
      name: '',
      email: '',
      role: '',
      phone: '',
      lang: '',
      password: '',
      password_confirmation: '',
      structure: null,
      job_title: '',
      floor: '',
      office: '',
      can_logged_in: false,
      status: true,
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
    employees.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.employee.getAll, { params });
    employees.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.employee.find(id, mode));
      Object.assign(form.value, response.data.employee);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch employee.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.employee.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create employee.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.employee.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.employee);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update employee.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.employee.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete employees.' };
    }
  };

  const requirements = async () => {
    structures.value = [];
    roles.value = [];
    try {
      const { data } = await api.get(endpoints.employee.requirements);
      structures.value = data.structures;
      roles.value = data.roles;
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
    employees,
    structures,
    roles,
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
