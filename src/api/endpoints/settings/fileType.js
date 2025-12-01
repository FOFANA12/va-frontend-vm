import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/file-types`,
  find: (id) => `${base.API_SETTING}/file-types/${id}`,
  create: `${base.API_SETTING}/file-types`,
  update: (id) => `${base.API_SETTING}/file-types/${id}`,
  destroy: `${base.API_SETTING}/file-types/destroy`,
};
