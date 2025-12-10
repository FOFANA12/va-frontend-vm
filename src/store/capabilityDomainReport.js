import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useCapabilityDomainReportStore = defineStore('capabilityDomainReport', () => {

  const getPerformanceReport = async (capabilityDomainId) => {

    try {
      const { data } = await api.get(endpoints.capabilityDomain.getPerformanceReport(capabilityDomainId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
