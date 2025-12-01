import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionStore = defineStore('action', () => {
  const actions = ref([]);

  const structures = ref([]);
  const actionPlans = ref([]);
  const contractTypes = ref([]);
  const projectOwners = ref([]);
  const delegatedProjectOwners = ref([]);
  const regions = ref([]);
  const departments = ref([]);
  const municipalities = ref([]);
  const programs = ref([]);
  const projects = ref([]);
  const activities = ref([]);
  const statusActions = ref([]);
  const riskLevels = ref([]);
  const priorityLevels = ref([]);
  const generateDocumentTypes = ref([]);

  const beneficiaries = ref([]);
  const stakeholders = ref([]);
  const fundingSources = ref([]);

  const defaultCurrency = ref(null);

  const form = ref(
    new Form({
      name: '',
      priority: '',
      risk_level: '',
      generate_document_type: '',
      currency: '',

      structure: '',
      action_plan: '',
      contract_type: '',
      procurement_mode: '',
      project_owner: '',
      delegated_project_owner: '',

      region: '',
      department: '',
      municipality: '',
      program: '',
      project: '',
      activity: '',

      description: '',
      prerequisites: '',
      impacts: '',
      risks: '',

      funding_sources: [],
      beneficiaries: [],
      stakeholders: [],
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
    actions.value = [];

    Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
    };

    const { data } = await api.get(endpoints.action.getAll, { params });
    actions.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id, mode = 'edit') => {
    try {
      const response = await api.get(endpoints.action.find(id, mode));
      Object.assign(form.value, response.data.action);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch action.' };
    }
  };

  const create = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.post(endpoints.action.create, form.value.data());
      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to create action.' };
    } finally {
      form.value.busy = false;
    }
  };

  const update = async (id) => {
    form.value.clear();
    form.value.busy = true;
    try {
      const response = await api.put(endpoints.action.update(id), form.value.data());
      resetForm();
      Object.assign(form.value, response.data.action);

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to update action.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.action.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete actions.' };
    }
  };

  const requirements = async () => {
    structures.value = [];
    actionPlans.value = [];
    contractTypes.value = [];
    projectOwners.value = [];
    delegatedProjectOwners.value = [];
    regions.value = [];
    departments.value = [];
    municipalities.value = [];
    programs.value = [];
    projects.value = [];
    activities.value = [];
    statusActions.value = [];
    riskLevels.value = [];
    priorityLevels.value = [];
    generateDocumentTypes.value = [];
    beneficiaries.value = [];
    stakeholders.value = [];
    fundingSources.value = [];
    defaultCurrency.value = null;

    try {
      const { data } = await api.get(endpoints.action.requirements);
      structures.value = data.structures;
      actionPlans.value = data.action_plans;
      contractTypes.value = data.contract_types;
      projectOwners.value = data.project_owners;
      delegatedProjectOwners.value = data.delegated_project_owners;
      regions.value = data.regions;
      departments.value = data.departments;
      municipalities.value = data.municipalities;
      programs.value = data.programs;
      projects.value = data.projects;
      activities.value = data.activities;
      statusActions.value = data.action_status;
      riskLevels.value = data.risk_levels;
      priorityLevels.value = data.priority_levels;
      generateDocumentTypes.value = data.generate_document_types;

      beneficiaries.value = data.beneficiaries;
      stakeholders.value = data.stakeholders;
      fundingSources.value = data.funding_sources;

      defaultCurrency.value = data.currency;

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
    structures,
    actions,
    actionPlans,
    contractTypes,
    projectOwners,
    delegatedProjectOwners,
    regions,
    departments,
    municipalities,
    programs,
    projects,
    activities,
    statusActions,
    riskLevels,
    priorityLevels,
    generateDocumentTypes,
    beneficiaries,
    stakeholders,
    fundingSources,
    defaultCurrency,
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
