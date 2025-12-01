import base from './urlBase';

export default {
  getAll: `${base.API}/decision-statuses?mode=list`,
  requirements: (decisionId) => `${base.API}/decision-statuses/requirements/${decisionId}`,
  find: (decisionStatusId) => `${base.API}/decision-statuses/${decisionStatusId}`,
  create: (decisionId) => `${base.API}/decision-statuses/store/${decisionId}`,
  destroy: `${base.API}/decision-statuses/destroy`,
};
