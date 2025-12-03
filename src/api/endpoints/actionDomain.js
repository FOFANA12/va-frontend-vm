import base from './urlBase';

export default {
  getAll: `${base.API}/action-domains?mode=list`,
  requirements: `${base.API}/action-domains/requirements`,
  find: (id, mode = 'edit') => `${base.API}/action-domains/${id}?mode=${mode}`,
  create: `${base.API}/action-domains`,
  update: (id) => `${base.API}/action-domains/${id}`,
  destroy: `${base.API}/action-domains/destroy`,
};
