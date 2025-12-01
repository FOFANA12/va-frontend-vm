import base from './urlBase';

export default {
  getAll: (actionId) => `${base.API}/action-statuses/${actionId}`,
  requirements: (actionId) => `${base.API}/action-statuses/${actionId}/requirements`,
  create: (actionId) => `${base.API}/action-statuses/${actionId}`,
  destroy: (actionId) => `${base.API}/action-statuses/${actionId}/destroy`,
};
