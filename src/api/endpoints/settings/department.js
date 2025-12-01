import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/departments?mode=list`,
  requirements: `${base.API_SETTING}/departments/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/departments/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/departments`,
  update: (id) => `${base.API_SETTING}/departments/${id}`,
  destroy: `${base.API_SETTING}/departments/destroy`,
};
