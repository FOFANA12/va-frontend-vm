import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/users?mode=list`,
  requirements: `${base.API_SETTING}/users/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/users/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/users`,
  update: (id) => `${base.API_SETTING}/users/${id}`,
  destroy: `${base.API_SETTING}/users/destroy`,
};
