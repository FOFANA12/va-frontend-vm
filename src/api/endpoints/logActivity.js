import base from './urlBase';

export default {
  getAll: `${base.API}/log-activities?mode=list`,
  find: (id, mode = 'view') => `${base.API}/log-activities/${id}?mode=${mode}`,
  destroy: `${base.API}/log-activities/destroy`,
};
