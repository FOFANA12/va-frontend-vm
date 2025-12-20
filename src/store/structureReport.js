import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useStructureReportStore = defineStore('structureReport', () => {
  const structures = ref([]);

  const requirements = async () => {
    structures.value = [];

    try {
      const { data } = await api.get(endpoints.structureReport.requirements);
      structures.value = data.structures;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getPerformanceReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.structureReport.getPerformanceReport(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load performance report.' };
    }
  };

  //Statistics
  const getAcquisitionReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.structureReport.statistics.getAcquisitionReport(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load acquisition report.' };
    }
  };

  const getGlobalExpenseReport = async (structureId) => {
    try {
      const { data } = await api.get(
        endpoints.structureReport.statistics.getGlobalExpenseReport(structureId)
      );
      return data;
    } catch (error) {
      throw { message: 'Failed to load general expense report.' };
    }
  };

  return {
    structures,
    requirements,
    getPerformanceReport,
    getAcquisitionReport,
    getGlobalExpenseReport,
  };
});
