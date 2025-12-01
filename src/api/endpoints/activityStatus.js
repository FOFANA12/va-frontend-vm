import base from './urlBase';

export default {
  getAll: (activityId) => `${base.API}/activity-statuses/${activityId}`,
  requirements: (activityId) => `${base.API}/activity-statuses/${activityId}/requirements`,
  create: (activityId) => `${base.API}/activity-statuses/${activityId}`,
  destroy: (activityId) => `${base.API}/activity-statuses/${activityId}/destroy`,
};
