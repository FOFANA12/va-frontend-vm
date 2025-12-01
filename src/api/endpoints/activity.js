import base from './urlBase';

export default {
  getAll: `${base.API}/activities?mode=list`,
  requirements: `${base.API}/activities/requirements`,
  find: (id, mode = 'edit') => `${base.API}/activities/${id}?mode=${mode}`,
  create: `${base.API}/activities`,
  update: (id) => `${base.API}/activities/${id}`,
  destroy: `${base.API}/activities/destroy`,
};
