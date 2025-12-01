import base from './urlBase';

export default {
  getAll: `${base.API}/programs?mode=list`,
  requirements: `${base.API}/programs/requirements`,
  find: (id, mode = 'edit') => `${base.API}/programs/${id}?mode=${mode}`,
  create: `${base.API}/programs`,
  update: (id) => `${base.API}/programs/${id}`,
  destroy: `${base.API}/programs/destroy`,
};
