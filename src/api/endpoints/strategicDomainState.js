import base from './urlBase';

export default {
  getAll: (strategicDomainId) => `${base.API}/strategic-domain-states/${strategicDomainId}`,
  requirements: (strategicDomainId) => `${base.API}/strategic-domain-states/${strategicDomainId}/requirements`,
  create: (strategicDomainId) => `${base.API}/strategic-domain-states/${strategicDomainId}`,
  destroy: (strategicDomainId) => `${base.API}/strategic-domain-states/${strategicDomainId}/destroy`,
};
