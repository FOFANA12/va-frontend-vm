import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useStrategicDomainReportStore = defineStore('strategicDomainReport', () => {

  const getPerformanceReport = async (strategicDomainId) => {

    try {
      const { data } = await api.get(endpoints.strategicDomain.getPerformanceReport(strategicDomainId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
