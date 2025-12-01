import base from './urlBase';

export default {
  getAll: (actionId) => `${base.API}/action-controls?actionId=${actionId}&mode=list`,
  requirements: (actionId) => `${base.API}/action-controls/requirements/${actionId}`,
  find: (controlId) => `${base.API}/action-controls/${controlId}`,
  create: (periodId) => `${base.API}/action-controls/${periodId}`,
  destroy: (controlId) => `${base.API}/action-controls/${controlId}`,
};
