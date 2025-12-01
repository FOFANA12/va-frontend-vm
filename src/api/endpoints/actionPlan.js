import base from './urlBase';

export default {
  getAll: `${base.API}/action-plans?mode=list`,
  requirements: `${base.API}/action-plans/requirements`,
  find: (id, mode = 'edit') => `${base.API}/action-plans/${id}?mode=${mode}`,
  create: `${base.API}/action-plans`,
  duplicate: `${base.API}/action-plans/duplicate`,
  update: (id) => `${base.API}/action-plans/${id}`,
  destroy: `${base.API}/action-plans/destroy`,
};
