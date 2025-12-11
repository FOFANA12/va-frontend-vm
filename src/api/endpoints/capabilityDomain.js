import base from './urlBase';

export default {
  getAll: `${base.API}/capability-domains?mode=list`,
  requirements: `${base.API}/capability-domains/requirements`,
  find: (id, mode = 'edit') => `${base.API}/capability-domains/${id}?mode=${mode}`,
  create: `${base.API}/capability-domains`,
  update: (id) => `${base.API}/capability-domains/${id}`,
  destroy: `${base.API}/capability-domains/destroy`,
  getGlobalReport: (id) => `${base.API}/report-capability-domains/${id}/global`,
};
