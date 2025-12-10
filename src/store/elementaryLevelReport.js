import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useElementaryLevelReportStore = defineStore('elementaryLevelReport', () => {

  const getPerformanceReport = async (elementaryLevelId) => {

    try {
      const { data } = await api.get(endpoints.elementaryLevel.getPerformanceReport(elementaryLevelId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  return {
    getPerformanceReport,
  };
});
