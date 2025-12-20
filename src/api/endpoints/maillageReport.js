import base from './urlBase';

export default {
  getActionDomainReport: () => `${base.API}/report-maillage/action-domain`,
  getStrategicDomainReport: () => `${base.API}/report-maillage/strategic-domain`,
  getCapabilityDomainReport: () => `${base.API}/report-maillage/capability-domain`,
  getElementaryLevelReport: () => `${base.API}/report-maillage/elementary-level`,
};
