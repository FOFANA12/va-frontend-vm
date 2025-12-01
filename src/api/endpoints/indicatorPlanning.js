import base from './urlBase';

export default {
  requirements: `${base.API}/indicator-plannings/requirements`,
  find: (id, mode = 'edit') => `${base.API}/indicator-plannings/${id}?mode=${mode}`,
  update: (id) => `${base.API}/indicator-plannings/${id}`,
};
