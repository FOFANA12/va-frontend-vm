import base from './urlBase';

export default {
  getAll: (indicatorId) => `${base.API}/indicator-statuses/${indicatorId}`,
  requirements: (indicatorId) => `${base.API}/indicator-statuses/${indicatorId}/requirements`,
  create: (indicatorId) => `${base.API}/indicator-statuses/${indicatorId}`,
  destroy: (indicatorId) => `${base.API}/indicator-statuses/${indicatorId}/destroy`,
};
