import base from './urlBase';

export default {
  getAll: `${base.API}/indicators?mode=list`,
  requirements: `${base.API}/indicators/requirements`,
  filters: `${base.API}/indicators/requirements?mode=filters`,
  find: (id, mode = 'edit') => `${base.API}/indicators/${id}?mode=${mode}`,
  create: `${base.API}/indicators`,
  update: (id) => `${base.API}/indicators/${id}`,
  destroy: `${base.API}/indicators/destroy`,
  statuses: `${base.API}/indicators/statuses`,
  updateStatus: (id) => `${base.API}/indicators/${id}/status`,
  getPerformanceReport: (id) => `${base.API}/report-indicators/${id}/performance`,
};
