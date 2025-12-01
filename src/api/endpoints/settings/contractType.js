import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/contract-types`,
  find: (id) => `${base.API_SETTING}/contract-types/${id}`,
  create: `${base.API_SETTING}/contract-types`,
  update: (id) => `${base.API_SETTING}/contract-types/${id}`,
  destroy: `${base.API_SETTING}/contract-types/destroy`,
};
