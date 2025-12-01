<template>
  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4 justify-center">
        <!-- Name -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4 md:col-start-3 lg:col-start-4">
          <Input
            id="name"
            name="name"
            v-model="form.name"
            :label="t('settings.role.form.name')"
            :placeholder="t('settings.role.form.namePlaceholder')"
            :error="form.errors.get('name')"
            required
          />
        </div>

        <!-- Checkbox Select/Deselect all -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
          <input
            id="selectAllPermissions"
            type="checkbox"
            :checked="areAllPermissionsSelected"
            @change="toggleAllPermissions"
            class="w-5 h-5 checkbox checkbox-primary mr-2"
          />
          <label for="selectAllPermissions" class="text-gray-700 text-sm">
            {{
              areAllPermissionsSelected
                ? t('settings.role.form.selectAllPermissions.deselect')
                : t('settings.role.form.selectAllPermissions.select')
            }}
          </label>
        </div>
      </div>
    </div>
  </div>

  <!-- Global permissions error -->
  <Alert
    v-if="form.errors.has('permissions')"
    type="error"
    :message="form.errors.get('permissions')"
    @close="clearError"
    class="mt-6"
  />

  <!-- Permission groups by category -->
  <div
    v-for="(permissions, category) in store.permissions"
    :key="category"
    class="w-full mx-auto bg-white rounded-lg my-6"
  >
    <div class="card-header flex items-center justify-between">
      <h2 class="text-base font-medium px-4 py-1">
        {{ category }}
      </h2>
      <div class="pr-4">
        <label class="flex items-center">
          <input
            type="checkbox"
            :checked="isAllSelected(category)"
            @change="toggleAll(category)"
            class="w-5 h-5 checkbox checkbox-primary mr-1"
          />
          <span class="text-sm">{{
            isAllSelected(category)
              ? t('settings.role.form.category.deselectAll')
              : t('settings.role.form.category.selectAll')
          }}</span>
        </label>
      </div>
    </div>
    <hr class="border-t border-gray-200 w-full mb-0" />

    <!-- List of permissions -->
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <div
          v-for="permission in permissions"
          :key="permission.id"
          class="col-span-12 md:col-span-6 lg:col-span-3 flex items-center"
        >
          <input
            :id="'permission-' + permission.id"
            type="checkbox"
            v-model="form.permissions"
            :value="permission.id"
            class="w-5 h-5 checkbox checkbox-primary mr-2"
          />
          <label :for="'permission-' + permission.id" class="text-sm text-gray-700">
            {{ permission.description }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSettingsRoleStore } from '@/store';

const { t } = useI18n();
const store = useSettingsRoleStore();
const form = store.form;

const clearError = () => {
  form.errors.clear('permissions');
};

const areAllPermissionsSelected = computed(() => {
  const all = Object.values(store.permissions)
    .flat()
    .map((p) => p.id);
  return all.every((id) => form.permissions.includes(id));
});

const toggleAllPermissions = () => {
  const all = Object.values(store.permissions)
    .flat()
    .map((p) => p.id);

  form.permissions = areAllPermissionsSelected.value
    ? form.permissions.filter((id) => !all.includes(id))
    : [...new Set([...form.permissions, ...all])];
};

const isAllSelected = (category) => {
  const ids = store.permissions[category].map((p) => p.id);
  return ids.every((id) => form.permissions.includes(id));
};

const toggleAll = (category) => {
  const ids = store.permissions[category].map((p) => p.id);

  form.permissions = isAllSelected(category)
    ? form.permissions.filter((id) => !ids.includes(id))
    : [...new Set([...form.permissions, ...ids])];
};
</script>
