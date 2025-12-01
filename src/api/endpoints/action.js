import base from './urlBase';

export default {
  getAll: `${base.API}/actions?mode=list`,
  requirements: `${base.API}/actions/requirements`,
  find: (id, mode = 'edit') => `${base.API}/actions/${id}?mode=${mode}`,
  create: `${base.API}/actions`,
  update: (id) => `${base.API}/actions/${id}`,
  destroy: `${base.API}/actions/destroy`,
  getPerformanceReport: (id) => `${base.API}/report-actions/${id}/performance`,
};
