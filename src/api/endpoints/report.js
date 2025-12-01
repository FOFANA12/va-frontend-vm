import base from './urlBase';

export default {
  requirements: `${base.API}/report-structure/requirements`,
  getPerformanceReport: (id) => `${base.API}/report-structure/${id}/performance`,
  statistics: {
    getAcquisitionReport: (id) => `${base.API}/report-structure/${id}/statistics/acquisitions`,
    getGlobalExpenseReport: (id) => `${base.API}/report-structure/${id}/statistics/expenses`,
  },
};
