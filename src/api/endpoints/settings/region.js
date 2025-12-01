import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/regions?mode=list`,
  requirements: `${base.API_SETTING}/regions/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/regions/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/regions`,
  update: (id) => `${base.API_SETTING}/regions/${id}`,
  destroy: `${base.API_SETTING}/regions/destroy`,
};
