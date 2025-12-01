import base from './urlBase';

export default {
  getAll: (indicatorId) => `${base.API}/indicator-controls?indicatorId=${indicatorId}&mode=list`,
  requirements: (periodId) => `${base.API}/indicator-controls/requirements/${periodId}`,
  find: (controlId) => `${base.API}/indicator-controls/${controlId}`,
  create: () => `${base.API}/indicator-controls`,
  destroy: (controlId) => `${base.API}/indicator-controls/${controlId}`,
};
