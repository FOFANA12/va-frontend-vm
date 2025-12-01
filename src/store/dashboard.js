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

  return {
    structures,
    requirements,
    getGeneralReport,
  };
});
