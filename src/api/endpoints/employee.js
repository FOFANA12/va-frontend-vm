import base from './urlBase';

export default {
  getAll: `${base.API}/employees?mode=list`,
  requirements: `${base.API}/employees/requirements`,
  find: (id, mode = 'edit') => `${base.API}/employees/${id}?mode=${mode}`,
  create: `${base.API}/employees`,
  update: (id) => `${base.API}/employees/${id}`,
  destroy: `${base.API}/employees/destroy`,
};
