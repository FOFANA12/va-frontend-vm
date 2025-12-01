import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/project-owners?mode=list`,
  requirements: `${base.API_SETTING}/project-owners/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/project-owners/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/project-owners`,
  update: (id) => `${base.API_SETTING}/project-owners/${id}`,
  destroy: `${base.API_SETTING}/project-owners/destroy`,
};
