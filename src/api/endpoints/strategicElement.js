import base from './urlBase';

export default {
  getAll: `${base.API}/strategic-elements?mode=list`,
  requirements: `${base.API}/strategic-elements/requirements`,
  find: (id, mode = 'edit') => `${base.API}/strategic-elements/${id}?mode=${mode}`,
  create: `${base.API}/strategic-elements`,
  update: (id) => `${base.API}/strategic-elements/${id}`,
  destroy: `${base.API}/strategic-elements/destroy`,
};
