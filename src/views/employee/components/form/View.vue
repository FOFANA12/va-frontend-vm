<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.personalInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="name"
              name="name"
              :label="t('employee.form.name')"
              :placeholder="t('employee.form.namePlaceholder')"
              :modelValue="form.name"
              readonly
            />
          </div>

          <!-- Email -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="email"
              name="email"
              :label="t('employee.form.email')"
              :placeholder="t('employee.form.emailPlaceholder')"
              :modelValue="form.email"
              readonly
            />
          </div>

          <!-- Phone -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="phone"
              name="phone"
              :label="t('employee.form.phone')"
              :placeholder="t('employee.form.phonePlaceholder')"
              :modelValue="form.phone"
              readonly
            />
          </div>

          <!-- Lang -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="lang"
              name="lang"
              :label="t('employee.form.lang')"
              :placeholder="t('employee.form.langPlaceholder')"
              :modelValue="form.lang"
              readonly
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
            <input
              id="status"
              type="checkbox"
              :checked="form.status"
              disabled
              class="checkbox-primary h-5 w-5 mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>

          <!-- Can be logged in -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 flex items-center">
            <input
              id="can_logged_in"
              type="checkbox"
              :checked="form.can_logged_in"
              disabled
              class="checkbox-primary h-5 w-5 mr-2 disabled:checkbox-disabled disabled:!bg-gray-100"
            />
            <label for="can_logged_in" class="text-gray-700">
              {{ t('employee.form.canLoggedIn') }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg mt-4">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.professionalInformation') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="structure"
              name="structure"
              :label="t('employee.form.structure')"
              :placeholder="t('employee.form.structurePlaceholder')"
              :modelValue="form.structure"
              readonly
            />
          </div>

          <!-- Job Title -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="job_title"
              name="job_title"
              :label="t('employee.form.jobTitle')"
              :placeholder="t('employee.form.jobTitlePlaceholder')"
              :modelValue="form.job_title"
              readonly
            />
          </div>

          <!-- Floor -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="floor"
              name="floor"
              :label="t('employee.form.floor')"
              :placeholder="t('employee.form.floorPlaceholder')"
              :modelValue="form.floor"
              readonly
            />
          </div>

          <!-- Office -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="office"
              name="office"
              :label="t('employee.form.office')"
              :placeholder="t('employee.form.officePlaceholder')"
              :modelValue="form.office"
              readonly
            />
          </div>

          <!-- Role -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="role"
              name="role"
              :label="t('employee.form.role')"
              :placeholder="t('employee.form.rolePlaceholder')"
              :modelValue="form.role"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Section Informations de connexion -->
    <!-- <div class="w-full mx-auto bg-white rounded-lg mt-6">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('employee.sections.security') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4"> -->
    <!-- Role -->
    <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="role"
              name="role"
              :label="t('employee.form.role')"
              :placeholder="t('employee.form.rolePlaceholder')"
              :modelValue="form.role"
              readonly
            />
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
  
<script setup>
import { useEmployeeStore } from '@/store';
const store = useEmployeeStore();
const form = store.form;
</script>
  