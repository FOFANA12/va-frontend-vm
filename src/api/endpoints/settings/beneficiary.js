import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/beneficiaries?mode=list`,
  requirements: `${base.API_SETTING}/beneficiaries/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/beneficiaries/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/beneficiaries`,
  update: (id) => `${base.API_SETTING}/beneficiaries/${id}`,
  destroy: `${base.API_SETTING}/beneficiaries/destroy`,
};
