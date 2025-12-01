import base from './urlBase';

export default {
  requirements: `${base.API}/action-plannings/requirements`,
  find: (id, mode = 'edit') => `${base.API}/action-plannings/${id}?mode=${mode}`,
  update: (id) => `${base.API}/action-plannings/${id}`,
};
