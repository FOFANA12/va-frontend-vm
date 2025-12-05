import base from './urlBase';

export default {
  getAll: (elementaryLevelId) => `${base.API}/elementary-level-states/${elementaryLevelId}`,
  requirements: (elementaryLevelId) => `${base.API}/elementary-level-states/${elementaryLevelId}/requirements`,
  create: (elementaryLevelId) => `${base.API}/elementary-level-states/${elementaryLevelId}`,
  destroy: (elementaryLevelId) => `${base.API}/elementary-level-states/${elementaryLevelId}/destroy`,
};
