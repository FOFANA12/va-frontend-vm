import base from './urlBase';

export default {
  requirements: `${base.API}/report-structure/requirements`,
  getGeneralDashboard: (id) => `${base.API}/report-dashboard/${id}/general`,
  getStrategicDashboard: (id) => `${base.API}/report-dashboard/${id}/strategic`,
  getOperationalDashboard: (id) => `${base.API}/report-dashboard/${id}/operational`,
  getFinancialDashboard: (id) => `${base.API}/report-dashboard/${id}/financial`,
};
