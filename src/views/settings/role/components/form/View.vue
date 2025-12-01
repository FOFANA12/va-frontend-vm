<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Name -->
          <div class="col-span-12 flex justify-center mb-4">
            <div class="w-full md:w-1/2 lg:w-1/3">
              <InputReadonly
                id="name"
                name="name"
                :label="t('settings.role.form.name')"
                :placeholder="t('settings.role.form.namePlaceholder')"
                :modelValue="form.name"
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions grouped by category (readonly checkboxes) -->
    <div
      v-for="(permissions, category) in store.permissions"
      :key="category"
      class="w-full mx-auto bg-white rounded-lg my-6"
    >
      <div class="card-header">
        <h2 class="text-lg px-4 py-1">{{ category }}</h2>
      </div>
      <hr class="border-t border-gray-200 w-full mb-0" />
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="permission in permissions"
            :key="permission.id"
            class="col-span-12 md:col-span-6 lg:col-span-3 flex items-center mb-4"
          >
            <input
              :id="'permission-' + permission.id"
              type="checkbox"
              :checked="form.permissions.includes(permission.id)"
              disabled
              class="w-5 h-5 checkbox checkbox-primary mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label :for="'permission-' + permission.id" class="text-gray-700">
              {{ permission.description }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsRoleStore } from '@/store';

const store = useSettingsRoleStore();
const form = store.form;
</script>
