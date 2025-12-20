import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';

export const useMaillageReportStore = defineStore('maillageReport', () => {
  const getActionDomainReport = async () => {
    try {
      const { data } = await api.get(endpoints.maillageReport.getActionDomainReport());
      return data;
    } catch (error) {
      throw { message: 'Failed to load report.' };
    }
  };

  const getStrategicDomainReport = async () => {
    try {
      const { data } = await api.get(endpoints.maillageReport.getStrategicDomainReport());
      return data;
    } catch (error) {
      throw { message: 'Failed to load report.' };
    }
  };

  const getCapabilityDomainReport = async () => {
    try {
      const { data } = await api.get(endpoints.maillageReport.getCapabilityDomainReport());
      return data;
    } catch (error) {
      throw { message: 'Failed to load report.' };
    }
  };

  const getElementaryLevelReport = async () => {
    try {
      const { data } = await api.get(endpoints.maillageReport.getElementaryLevelReport());
      return data;
    } catch (error) {
      throw { message: 'Failed to load report.' };
    }
  };

  return {
    getActionDomainReport,
    getStrategicDomainReport,
    getCapabilityDomainReport,
    getElementaryLevelReport,
  };
});
