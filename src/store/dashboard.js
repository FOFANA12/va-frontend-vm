import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useDahsboardReportStore = defineStore('dashboardReport', () => {
  const structures = ref([]);

  const requirements = async () => {
    structures.value = [];

    try {
      const { data } = await api.get(endpoints.report.requirements);
      structures.value = data.structures;

      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const getGeneralReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.dashboard.getGeneralDashboard(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load general report.' };
    }
  };

  const getStrategicReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.dashboard.getStrategicDashboard(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load strategic report.' };
    }
  };

  const getOperationalReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.dashboard.getOperationalDashboard(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load operational report.' };
    }
  };

  const getFinancialReport = async (structureId) => {
    try {
      const { data } = await api.get(endpoints.dashboard.getFinancialDashboard(structureId));
      return data;
    } catch (error) {
      throw { message: 'Failed to load financial report.' };
    }
  };

  return {
    structures,
    requirements,
    getGeneralReport,
    getStrategicReport,
    getOperationalReport,
    getFinancialReport
  };
});
