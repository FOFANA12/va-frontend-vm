import base from './urlBase';

export default {
  getAll: `${base.API}/elementary-levels?mode=list`,
  requirements: `${base.API}/elementary-levels/requirements`,
  find: (id, mode = 'edit') => `${base.API}/elementary-levels/${id}?mode=${mode}`,
  create: `${base.API}/elementary-levels`,
  update: (id) => `${base.API}/elementary-levels/${id}`,
  destroy: `${base.API}/elementary-levels/destroy`,
  getPerformanceReport: (id) => `${base.API}/report-elementary-levels/${id}/performance`,
};
