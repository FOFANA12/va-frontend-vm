import base from './urlBase';

export default {
  getAll: `${base.API}/structures?mode=list`,
  requirements: `${base.API}/structures/requirements`,
  find: (id, mode = 'edit') => `${base.API}/structures/${id}?mode=${mode}`,
  create: `${base.API}/structures`,
  update: (id) => `${base.API}/structures/${id}`,
  destroy: `${base.API}/structures/destroy`,
};
