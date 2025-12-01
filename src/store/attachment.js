import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useAttachmentStore = defineStore('attachment', () => {
  const attachments = ref([]);
  const fileTypes = ref([]);

  const form = ref(
    new Form({
      attachable_type: null,
      attachable_id: null,
      file: null,
      title: null,
      file_type: null,
      comment: null,
    })
  );

  const serverParams = reactive({
    pageIndex: 0,
    pageSize: 10,
    sortBy: 'id',
    sortOrder: 'desc',
    searchTerm: '',
    attachableType: null,
    attachableId: null,
    filterFileType: null,
  });

  const meta = ref({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  const getAll = async ({
    pageIndex = serverParams.pageIndex,
    pageSize = serverParams.pageSize,
    sortBy = serverParams.sortBy,
    sortOrder = serverParams.sortOrder,
    searchTerm = serverParams.searchTerm,
    attachableType = serverParams.attachableType,
    attachableId = serverParams.attachableId,
    filterFileType = serverParams.filterFileType,
  } = {}) => {
    if (!attachableType || !attachableId) {
      throw new Error('attachableType and attachableUuid are required to fetch attachments.');
    }

    attachments.value = [];

    Object.assign(serverParams, {
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      attachableType,
      attachableId,
      filterFileType,
    });

    const params = {
      page: pageIndex + 1,
      perPage: pageSize,
      sortBy,
      sortOrder,
      searchTerm,
      attachableType,
      attachableId,
      filterFileType,
    };

    const { data } = await api.get(endpoints.attachment.getAll, { params });
    attachments.value = data.data;
    meta.value = data.meta;
  };

  const find = async (id) => {
    try {
      const response = await api.get(endpoints.attachment.find(id));
      Object.assign(form.value, response.data.attachment);
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Unable to fetch attachment.' };
    }
  };

  const upload = async () => {
    form.value.clear();
    form.value.busy = true;
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(form.value.data())) {
        if (value == null) continue;
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const response = await api.post(endpoints.attachment.upload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      form.value.errors.set(error.response?.data?.errors || {});
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to upload attachment.' };
    } finally {
      form.value.busy = false;
    }
  };

  const destroy = async (ids) => {
    try {
      const response = await api.post(endpoints.attachment.destroy, { ids });
      return response.data;
    } catch (error) {
      if (error?.response?.data) throw error.response.data;
      throw { message: 'Failed to delete attachments.' };
    }
  };

  const requirements = async () => {
    try {
      const { data } = await api.get(endpoints.attachment.requirements);
      return data;
    } catch (error) {
      throw { message: 'Failed to load requirements.' };
    }
  };

  const setFilters = (filters) => {
    serverParams.filterFileType = filters.filterFileType || '';
    serverParams.pageIndex = 0;
  };

  const getFilters = async () => {
    fileTypes.value = [];
    try {
      const { data } = await api.get(endpoints.attachment.requirements);
      fileTypes.value = data.file_types;
    } catch (error) {
      throw { message: 'Failed to load filters.' };
    }
  };

  const resetForm = () => {
    form.value.clear();
    form.value.errors.clear();
    form.value.reset();
    form.value.busy = false;
  };

  const resetServerParams = () => {
    Object.assign(serverParams, {
      pageIndex: 0,
      pageSize: 10,
      sortBy: 'id',
      sortOrder: 'desc',
      searchTerm: '',
    });

    meta.value = {
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
      from: 0,
      to: 0,
    };
  };

  return {
    attachments,
    fileTypes,
    form,
    meta,
    serverParams,
    getAll,
    find,
    upload,
    destroy,
    resetForm,
    resetServerParams,
    requirements,
    getFilters,
    setFilters
  };
});
