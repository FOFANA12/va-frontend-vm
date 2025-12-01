import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/roles?mode=list`,
  requirements: `${base.API_SETTING}/roles/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/roles/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/roles`,
  update: (id) => `${base.API_SETTING}/roles/${id}`,
  destroy: `${base.API_SETTING}/roles/destroy`,
};
