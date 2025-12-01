import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/indicator-categories`,
  find: (id) => `${base.API_SETTING}/indicator-categories/${id}`,
  create: `${base.API_SETTING}/indicator-categories`,
  update: (id) => `${base.API_SETTING}/indicator-categories/${id}`,
  destroy: `${base.API_SETTING}/indicator-categories/destroy`,
};
