import base from './urlBase';

export default {
  getAll: (projectId) => `${base.API}/project-statuses/${projectId}`,
  requirements: (projectId) => `${base.API}/project-statuses/${projectId}/requirements`,
  create: (projectId) => `${base.API}/project-statuses/${projectId}`,
  destroy: (projectId) => `${base.API}/project-statuses/${projectId}/destroy`,
};
