import base from './urlBase';

export default {
  getAll: `${base.API}/action-fund-receipts?mode=list`,
  requirements: (mode = 'create') => `${base.API}/action-fund-receipts/requirements?mode=${mode}`,
  find: (id, mode = 'edit') => `${base.API}/action-fund-receipts/${id}?mode=${mode}`,
  create: `${base.API}/action-fund-receipts`,
  update: (id) => `${base.API}/action-fund-receipts/${id}`,
  destroy: `${base.API}/action-fund-receipts/destroy`,
};
