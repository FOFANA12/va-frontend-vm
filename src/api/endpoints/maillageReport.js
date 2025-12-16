import base from './urlBase';

export default {
  requirements: `${base.API}/report-maillage/requirements`,
  getPerformanceReport: (id) => `${base.API}/report-maillage/${id}/performance`,
  statistics: {
    getAcquisitionReport: (id) => `${base.API}/report-maillage/${id}/statistics/acquisitions`,
    getGlobalExpenseReport: (id) => `${base.API}/report-maillage/${id}/statistics/expenses`,
  },
};
