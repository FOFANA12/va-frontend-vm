import base from './urlBase';

export default {
  getAll: (activityId) => `${base.API}/activity-states/${activityId}`,
  requirements: (activityId) => `${base.API}/activity-states/${activityId}/requirements`,
  create: (activityId) => `${base.API}/activity-states/${activityId}`,
  destroy: (activityId) => `${base.API}/activity-states/${activityId}/destroy`,
};
