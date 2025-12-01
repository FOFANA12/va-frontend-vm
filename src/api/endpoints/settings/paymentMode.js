import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/payment-modes`,
  find: (id) => `${base.API_SETTING}/payment-modes/${id}`,
  create: `${base.API_SETTING}/payment-modes`,
  update: (id) => `${base.API_SETTING}/payment-modes/${id}`,
  destroy: `${base.API_SETTING}/payment-modes/destroy`,
};
