import base from './urlBase';

export default {
  getAll: (actionDomainId) => `${base.API}/action-domain-states/${actionDomainId}`,
  requirements: (actionDomainId) => `${base.API}/action-domain-states/${actionDomainId}/requirements`,
  create: (actionDomainId) => `${base.API}/action-domain-states/${actionDomainId}`,
  destroy: (actionDomainId) => `${base.API}/action-domain-states/${actionDomainId}/destroy`,
};
