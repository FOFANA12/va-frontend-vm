import base from './urlBase';

export default {
  getAll: (capabilityDomainId) => `${base.API}/capability-domain-statuses/${capabilityDomainId}`,
  requirements: (capabilityDomainId) => `${base.API}/capability-domain-statuses/${capabilityDomainId}/requirements`,
  create: (capabilityDomainId) => `${base.API}/capability-domain-statuses/${capabilityDomainId}`,
  destroy: (capabilityDomainId) => `${base.API}/capability-domain-statuses/${capabilityDomainId}/destroy`,
};
