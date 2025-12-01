import base from './urlBase';

export default {
  getAll: (programId) => `${base.API}/program-states/${programId}`,
  requirements: (programId) => `${base.API}/program-states/${programId}/requirements`,
  create: (programId) => `${base.API}/program-states/${programId}`,
  destroy: (programId) => `${base.API}/program-states/${programId}/destroy`,
};
