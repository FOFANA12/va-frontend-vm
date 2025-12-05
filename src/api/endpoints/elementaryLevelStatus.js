import base from './urlBase';

export default {
  getAll: (elementaryLevelId) => `${base.API}/elementary-level-statuses/${elementaryLevelId}`,
  requirements: (elementaryLevelId) => `${base.API}/elementary-level-statuses/${elementaryLevelId}/requirements`,
  create: (elementaryLevelId) => `${base.API}/elementary-level-statuses/${elementaryLevelId}`,
  destroy: (elementaryLevelId) => `${base.API}/elementary-level-statuses/${elementaryLevelId}/destroy`,
};
