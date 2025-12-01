import base from './urlBase';

export default {
  getAll: `${base.API}/strategic-stakeholders?mode=list`,
  find: (id) => `${base.API}/strategic-stakeholders/${id}`,
  create: (strategicMapId) => `${base.API}/strategic-stakeholders/${strategicMapId}`,
  update: (id) => `${base.API}/strategic-stakeholders/${id}`,
  destroy: `${base.API}/strategic-stakeholders/destroy`,
};
