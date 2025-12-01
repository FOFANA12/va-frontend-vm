import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/currencies`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/currencies/${id}`,
  create: `${base.API_SETTING}/currencies`,
  update: (id) => `${base.API_SETTING}/currencies/${id}`,
  destroy: `${base.API_SETTING}/currencies/destroy`,
  getDefault: `${base.API_SETTING}/currencies/default`,
};
