import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/budget-types`,
  find: (id) => `${base.API_SETTING}/budget-types/${id}`,
  create: `${base.API_SETTING}/budget-types`,
  update: (id) => `${base.API_SETTING}/budget-types/${id}`,
  destroy: `${base.API_SETTING}/budget-types/destroy`,
};
