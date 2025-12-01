import base from './urlBase';

export default {
  getAll: `${base.API}/action-fund-disbursements?mode=list`,
  requirements: (mode = 'create') => `${base.API}/action-fund-disbursements/requirements?mode=${mode}`,
  find: (id, mode = 'edit') => `${base.API}/action-fund-disbursements/${id}?mode=${mode}`,
  create: `${base.API}/action-fund-disbursements`,
  update: (id) => `${base.API}/action-fund-disbursements/${id}`,
  destroy: `${base.API}/action-fund-disbursements/destroy`,
};
