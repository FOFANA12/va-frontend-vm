import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/default-phases`,
  requirements: `${base.API_SETTING}/default-phases/requirements`,
  find: (phaseId, mode = 'edit') => `${base.API_SETTING}/default-phases/${phaseId}?mode=${mode}`,
  create: `${base.API_SETTING}/default-phases`,
  update: (phaseId) => `${base.API_SETTING}/default-phases/${phaseId}`,
  destroy: (phaseId) => `${base.API_SETTING}/default-phases/${phaseId}`,
};
