import base from './urlBase';

export default {
  getAll: (programId) => `${base.API}/program-statuses/${programId}`,
  requirements: (programId) => `${base.API}/program-statuses/${programId}/requirements`,
  create: (programId) => `${base.API}/program-statuses/${programId}`,
  destroy: (programId) => `${base.API}/program-statuses/${programId}/destroy`,
};
