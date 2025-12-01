import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useIndicatorReportStore = defineStore('indicatorReport', () => {

  const getPerformanceReport = async (indicatorId) => {

    try {
      const { data } = await api.get(endpoints.indicator.getPerformanceReport(indicatorId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
