import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useSettingsBeneficiaryStore = defineStore('settingsBeneficiary', () => {
    const beneficiaries = ref([]);

    const form = ref(
        new Form({
            name: '',
            email: '',
            phone: '',
            status: true,
        })
    );

    const serverParams = reactive({
        pageIndex: 0,
        pageSize: 10,
        sortBy: 'id',
        sortOrder: 'desc',
        searchTerm: '',
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
    } = {}) => {
        beneficiaries.value = [];

        Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

        const params = {
            page: pageIndex + 1,
            perPage: pageSize,
            sortBy,
            sortOrder,
            searchTerm,
        };

        const { data } = await api.get(endpoints.settings.beneficiary.getAll, { params });
        beneficiaries.value = data.data;
        meta.value = data.meta;
    };

      const find = async (id, mode = 'edit') => {
        try {
          const response = await api.get(endpoints.settings.beneficiary.find(id, mode));
          Object.assign(form.value, response.data.beneficiary);
          console.log('DATA:', response.data);

          return response.data;
        } catch (error) {
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Unable to fetch beneficiary.' };
        }
      };

      const create = async () => {
        form.value.clear();
        form.value.busy = true;
        try {
          const response = await api.post(endpoints.settings.beneficiary.create, form.value.data());
          return response.data;
        } catch (error) {
          form.value.errors.set(error.response?.data?.errors || {});
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to create beneficiary.' };
        } finally {
          form.value.busy = false;
        }
      };

      const update = async (id) => {
        form.value.clear();
        form.value.busy = true;
        try {
          const response = await api.put(
            endpoints.settings.beneficiary.update(id),
            form.value.data()
          );
          return response.data;
        } catch (error) {
          form.value.errors.set(error.response?.data?.errors || {});
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to update beneficiary.' };
        } finally {
          form.value.busy = false;
        }
      };

      const destroy = async (ids) => {
        try {
          const response = await api.post(endpoints.settings.beneficiary.destroy, { ids });
          return response.data;
        } catch (error) {
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to delete beneficiary.' };
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
        beneficiaries,
        form,
        meta,
        serverParams,
        getAll,
        find,
        create,
        update,
        destroy,
        resetForm,
        resetServerParams,
    };
});
