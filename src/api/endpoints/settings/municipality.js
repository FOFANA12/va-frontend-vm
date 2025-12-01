import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/municipalities?mode=list`,
  requirements: `${base.API_SETTING}/municipalities/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/municipalities/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/municipalities`,
  update: (id) => `${base.API_SETTING}/municipalities/${id}`,
  destroy: `${base.API_SETTING}/municipalities/destroy`,
};
