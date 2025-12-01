import base from './urlBase';

export default {
  requirements: `${base.API}/report-structure/requirements`,
  getGeneralDashboard: (id) => `${base.API}/report-dashboard/${id}/general`,
};
