import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useActionDomainReportStore = defineStore('actionDomainReport', () => {

  const getPerformanceReport = async (actionDomainId) => {

    try {
      const { data } = await api.get(endpoints.actionDomain.getPerformanceReport(actionDomainId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
