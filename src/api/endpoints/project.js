import base from './urlBase';

export default {
  getAll: `${base.API}/projects?mode=list`,
  requirements: `${base.API}/projects/requirements`,
  find: (id, mode = 'edit') => `${base.API}/projects/${id}?mode=${mode}`,
  create: `${base.API}/projects`,
  update: (id) => `${base.API}/projects/${id}`,
  destroy: `${base.API}/projects/destroy`,
};
