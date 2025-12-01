import base from './urlBase';

export default {
  getAll: (projectId) => `${base.API}/project-states/${projectId}`,
  requirements: (projectId) => `${base.API}/project-states/${projectId}/requirements`,
  create: (projectId) => `${base.API}/project-states/${projectId}`,
  destroy: (projectId) => `${base.API}/project-states/${projectId}/destroy`,
};
