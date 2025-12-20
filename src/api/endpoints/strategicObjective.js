import base from './urlBase';

export default {
  getAll: `${base.API}/strategic-objectives?mode=list`,
  requirements: `${base.API}/strategic-objectives/requirements`,
  filters: `${base.API}/strategic-objectives/requirements?mode=filters`,
  find: (id, mode = 'edit') => `${base.API}/strategic-objectives/${id}?mode=${mode}`,
  create: `${base.API}/strategic-objectives`,
  update: (id) => `${base.API}/strategic-objectives/${id}`,
  destroy: `${base.API}/strategic-objectives/destroy`,
  statuses: (id) => `${base.API}/strategic-objectives/${id}/statuses`,
  updateStatus: (id) => `${base.API}/strategic-objectives/${id}/status`,
};
