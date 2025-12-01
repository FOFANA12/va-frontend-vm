import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/stakeholders?mode=list`,
  requirements: `${base.API_SETTING}/stakeholders/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/stakeholders/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/stakeholders`,
  update: (id) => `${base.API_SETTING}/stakeholders/${id}`,
  destroy: `${base.API_SETTING}/stakeholders/destroy`,
};
