import base from './urlBase';

export default {
  getAll: `${base.API}/strategic-maps?mode=list`,
  requirements: `${base.API}/strategic-maps/requirements`,
  find: (id, mode = 'edit') => `${base.API}/strategic-maps/${id}?mode=${mode}`,
  create: `${base.API}/strategic-maps`,
  update: (id) => `${base.API}/strategic-maps/${id}`,
  destroy: `${base.API}/strategic-maps/destroy`,
};
