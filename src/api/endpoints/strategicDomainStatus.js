import base from './urlBase';

export default {
  getAll: (strategicDomainId) => `${base.API}/strategic-domain-statuses/${strategicDomainId}`,
  requirements: (strategicDomainId) => `${base.API}/strategic-domain-statuses/${strategicDomainId}/requirements`,
  create: (strategicDomainId) => `${base.API}/strategic-domain-statuses/${strategicDomainId}`,
  destroy: (strategicDomainId) => `${base.API}/strategic-domain-statuses/${strategicDomainId}/destroy`,
};
