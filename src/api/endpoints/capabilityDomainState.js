import base from './urlBase';

export default {
  getAll: (capabilityDomainId) => `${base.API}/capability-domain-states/${capabilityDomainId}`,
  requirements: (capabilityDomainId) => `${base.API}/capability-domain-states/${capabilityDomainId}/requirements`,
  create: (capabilityDomainId) => `${base.API}/capability-domain-states/${capabilityDomainId}`,
  destroy: (capabilityDomainId) => `${base.API}/capability-domain-states/${capabilityDomainId}/destroy`,
};
