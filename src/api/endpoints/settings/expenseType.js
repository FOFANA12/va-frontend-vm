import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/expense-types?mode=list`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/expense-types/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/expense-types`,
  update: (id) => `${base.API_SETTING}/expense-types/${id}`,
  destroy: `${base.API_SETTING}/expense-types/destroy`,
};
