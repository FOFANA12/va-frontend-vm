import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useMaillageReportStore = defineStore('maillageReport', () => {
  const maillages = ref([]);

  const requirements = async () => {
    maillages.value = [];

    try {
      const { data } = await api.get(endpoints.maillageReport.requirements);
      maillages.value = data.maillages;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getPerformanceReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.maillageReport.getPerformanceReport(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance maillage report.' };
    }
  };

  //Statistics
  const getAcquisitionReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.maillageReport.statistics.getAcquisitionReport(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load acquisition maillage report.' };
    }
  };

  const getGlobalExpenseReport = async (structureId) => {
    try {
      const { data } = await api.get(
        endpoints.maillageReport.statistics.getGlobalExpenseReport(structureId)
      );
      return data;
    } catch (error) {
      throw { message: 'Failed to load general expense maillage report.' };
    }
  };

  return {
    maillages,
    requirements,
    getPerformanceReport,
    getAcquisitionReport,
    getGlobalExpenseReport,
  };
});
