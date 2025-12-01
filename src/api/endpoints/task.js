import base from './urlBase';

export default {
  requirements: (actionId) => `${base.API}/tasks/requirements/${actionId}`,
  create: (actionPhaseId) => `${base.API}/tasks/${actionPhaseId}`,
  find: (taskId, mode = 'edit') => `${base.API}/tasks/task/${taskId}?mode=${mode}`,
  update: (taskId) => `${base.API}/tasks/task/${taskId}`,
  destroy: (taskId) => `${base.API}/tasks/destroy/${taskId}`,
  toggle: (taskId) => `${base.API}/tasks/task/${taskId}/toggle`,
};
