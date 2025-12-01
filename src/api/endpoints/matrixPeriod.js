import base from './urlBase';

export default {
  getMatrixPeriods: (strategicMapId) =>
    `${base.API}/matrix-periods/map/${strategicMapId}?mode=details`,
  availableObjectives: (strategicMapId, matrixPeriodId) =>
    `${base.API}/matrix-periods/map/${strategicMapId}/${matrixPeriodId}/objectives/available`,
  find: (id, mode = 'edit') => `${base.API}/matrix-periods/${id}?mode=${mode}`,
  create: (strategicMapId) => `${base.API}/matrix-periods/map/${strategicMapId}`,
  update: (id) => `${base.API}/matrix-periods/${id}`,
  attachObjectives: (id) => `${base.API}/matrix-periods/${id}/objectives`,
  detachObjective: (matrixPeriodId, objectiveId) =>
    `${base.API}/matrix-periods/${matrixPeriodId}/objectives/${objectiveId}`,
  destroy: (id) => `${base.API}/matrix-periods/destroy/${id}`,
};
