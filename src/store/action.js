import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useActionStore = defineStore('action', () => {
  const actions = ref([]);

  const structures = ref([]);
  const actionPlans = ref([]);
  const projectOwners = ref([]);
  const delegatedProjectOwners = ref([]);
  const regions = ref([]);
  const departments = ref([]);
  const municipalities = ref([]);
  const chartTypes = ref([]);

  const actionDomains = ref([]);
  const strategicDomains = ref([]);
  const capabilityDomains = ref([]);
  const elementaryLevels = ref([]);

  const statusActions = ref([]);
  const riskLevels = ref([]);
  const priorityLevels = ref([]);
  const generateDocumentTypes = ref([]);
  const users = ref([]);

  const beneficiaries = ref([]);
  const stakeholders = ref([]);
  const fundingSources = ref([]);

  const defaultCurrency = ref(null);

  const filterStatuses = ref([]);
  const filterStates = ref([]);

  const form = ref(
    new Form({
      name: '',
      priority: '',
      risk_level: '',
      generate_document_type: '',
      currency: '',

      structure: '',
      responsible_structure: '',
      responsible: '',
      action_plan: '',
      project_owner: '',
      delegated_project_owner: '',

      region: '',
      department: '',
      municipality: '',
      action_domain: '',
      strategic_domain: '',
      capability_domain: '',

      description: '',
      chart_type: '',
      prerequisites: '',
      impacts: '',
      risks: '',

      funding_sources: [],
      beneficiaries: [],
      stakeholders: [],
      is_planned: false,
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    status: null,
    state: null,
    nature: null,
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
    status = serverParams.status,
    state = serverParams.state,
    nature = serverParams.nature,
  } = {}) => {
    actions.value = [];

    Object.assign(serverParams, {
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      status,
      state,
      nature,
    });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      status,
      state,
      nature,
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
    projectOwners.value = [];
    delegatedProjectOwners.value = [];
    regions.value = [];
    departments.value = [];
    municipalities.value = [];
    actionDomains.value = [];
    strategicDomains.value = [];
    capabilityDomains.value = [];
    elementaryLevels.value = [];
    statusActions.value = [];
    riskLevels.value = [];
    priorityLevels.value = [];
    generateDocumentTypes.value = [];
    beneficiaries.value = [];
    stakeholders.value = [];
    fundingSources.value = [];
    defaultCurrency.value = null;
    chartTypes.value = [];
    users.value = [];

    try {
      const { data } = await api.get(endpoints.action.requirements);
      structures.value = data.structures;
      actionPlans.value = data.action_plans;
      projectOwners.value = data.project_owners;
      delegatedProjectOwners.value = data.delegated_project_owners;
      regions.value = data.regions;
      departments.value = data.departments;
      municipalities.value = data.municipalities;
      actionDomains.value = data.action_domains;
      strategicDomains.value = data.strategic_domains;
      capabilityDomains.value = data.capability_domains;
      elementaryLevels.value = data.elementary_levels;
      statusActions.value = data.action_status;
      riskLevels.value = data.risk_levels;
      priorityLevels.value = data.priority_levels;
      generateDocumentTypes.value = data.generate_document_types;
      chartTypes.value = data.chart_types;
      users.value = data.users;

      beneficiaries.value = data.beneficiaries;
      stakeholders.value = data.stakeholders;
      fundingSources.value = data.funding_sources;

      defaultCurrency.value = data.currency;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const setFilters = (filters) => {
    serverParams.status = filters.status || '';
    serverParams.state = filters.state || '';
    serverParams.nature = filters.nature || '';
    serverParams.pageIndex = 0;
  };

  const getFilters = async () => {
    filterStatuses.value = [];
    filterStates.value = [];

    try {
      const { data } = await api.get(endpoints.action.filters);

      filterStatuses.value = data.statuses;
      filterStates.value = data.states;

      return data;
    } catch (error) {
      throw { message: 'Failed to load filters.' };
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
      status: null,
      state: null,
      nature: null,
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
    projectOwners,
    delegatedProjectOwners,
    regions,
    departments,
    municipalities,
    actionDomains,
    strategicDomains,
    capabilityDomains,
    elementaryLevels,
    statusActions,
    riskLevels,
    priorityLevels,
    generateDocumentTypes,
    chartTypes,
    users,
    beneficiaries,
    stakeholders,
    fundingSources,
    defaultCurrency,
    form,
    meta,
    serverParams,
    filterStatuses,
    filterStates,
    getAll,
    find,
    create,
    update,
    destroy,
    requirements,
    resetForm,
    resetServerParams,
    setFilters,
    getFilters,
  };
});
