import base from './urlBase';

export default {
  getAll: `${base.API}/strategic-domains?mode=list`,
  requirements: `${base.API}/strategic-domains/requirements`,
  find: (id, mode = 'edit') => `${base.API}/strategic-domains/${id}?mode=${mode}`,
  create: `${base.API}/strategic-domains`,
  update: (id) => `${base.API}/strategic-domains/${id}`,
  destroy: `${base.API}/strategic-domains/destroy`,
};
