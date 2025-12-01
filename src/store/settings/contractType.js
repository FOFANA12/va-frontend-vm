import { defineStore } from 'pinia';
import { endpoints } from '@/api/endpoints';
import api from '@/api/axios';
import Form from 'vform';

export const useSettingsContractTypeStore = defineStore('settingsContractType', () => {
    const contractTypes = ref([]);

    const form = ref(
        new Form({
            name: '',
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
        contractTypes.value = [];

        Object.assign(serverParams, { pageIndex, pageSize, sortBy, sortOrder, searchTerm });

        const params = {
            page: pageIndex + 1,
            perPage: pageSize,
            sortBy,
            sortOrder,
            searchTerm,
        };

        const { data } = await api.get(endpoints.settings.contractType.getAll, { params });
        contractTypes.value = data.data;
        meta.value = data.meta;
    };

      const find = async (id) => {
        try {
          const response = await api.get(endpoints.settings.contractType.find(id));
          Object.assign(form.value, response.data.contract_type);
          console.log('DATA:', response.data);

          return response.data;
        } catch (error) {
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Unable to fetch contract type.' };
        }
      };

      const create = async () => {
        form.value.clear();
        form.value.busy = true;
        try {
          const response = await api.post(endpoints.settings.contractType.create, form.value.data());
          return response.data;
        } catch (error) {
          form.value.errors.set(error.response?.data?.errors || {});
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to create contract type.' };
        } finally {
          form.value.busy = false;
        }
      };

      const update = async (id) => {
        form.value.clear();
        form.value.busy = true;
        try {
          const response = await api.put(
            endpoints.settings.contractType.update(id),
            form.value.data()
          );
          return response.data;
        } catch (error) {
          form.value.errors.set(error.response?.data?.errors || {});
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to update contract type.' };
        } finally {
          form.value.busy = false;
        }
      };

      const destroy = async (ids) => {
        try {
          const response = await api.post(endpoints.settings.contractType.destroy, { ids });
          return response.data;
        } catch (error) {
          if (error?.response?.data) throw error.response.data;
          throw { message: 'Failed to delete contract type.' };
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
        contractTypes,
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
