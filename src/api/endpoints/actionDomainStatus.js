import base from './urlBase';

export default {
  getAll: (actionDomainId) => `${base.API}/action-domain-statuses/${actionDomainId}`,
  requirements: (actionDomainId) => `${base.API}/action-domain-statuses/${actionDomainId}/requirements`,
  create: (actionDomainId) => `${base.API}/action-domain-statuses/${actionDomainId}`,
  destroy: (actionDomainId) => `${base.API}/action-domain-statuses/${actionDomainId}/destroy`,
};
