import base from './urlBase';

export default {
  getAll: `${base.API}/decisions?mode=list`,
  requirements: `${base.API}/decisions/requirements`,
  find: (id, mode = 'edit') => `${base.API}/decisions/${id}?mode=${mode}`,
  create: `${base.API}/decisions`,
  update: (id) => `${base.API}/decisions/${id}`,
  destroy: `${base.API}/decisions/destroy`,
};
