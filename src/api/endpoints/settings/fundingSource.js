import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/funding-sources?mode=list`,
  requirements: `${base.API_SETTING}/funding-sources/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/funding-sources/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/funding-sources`,
  update: (id) => `${base.API_SETTING}/funding-sources/${id}`,
  destroy: `${base.API_SETTING}/funding-sources/destroy`,
};
