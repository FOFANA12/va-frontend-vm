import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useActionReportStore = defineStore('actionReport', () => {

  const getPerformanceReport = async (actionId) => {

    try {
      const { data } = await api.get(endpoints.action.getPerformanceReport(actionId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
