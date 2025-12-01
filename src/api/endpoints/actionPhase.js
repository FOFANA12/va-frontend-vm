import base from './urlBase';

export default {
  getAll: (actionId) => `${base.API}/action-phases/${actionId}`,
  requirements: `${base.API}/action-phases/requirements`,
  find: (phaseId, mode = 'edit') => `${base.API}/action-phases/phase/${phaseId}?mode=${mode}`,
  create: (actionId) => `${base.API}/action-phases/${actionId}`,
  update: (actionId, phaseId) => `${base.API}/action-phases/phase/${actionId}/${phaseId}`,
  destroy: (phaseId) => `${base.API}/action-phases/destroy/${phaseId}`,
  initialize: (actionId) => `${base.API}/action-phases/initialize/${actionId}`,
};
