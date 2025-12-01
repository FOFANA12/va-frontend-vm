<template>
  <div class="flex justify-end mt-4 gap-4">
    <LinkButton
      :to="{ name: 'strategicMap' }"
      variant="secondary"
      customClass="min-w-[100px] px-3 sm:px-3 text-gray-700 hover:bg-gray-400"
    >
      {{ t('strategicMap.btnList') }}
    </LinkButton>
  </div>

  <div class="mt-6">
    <Details />
  </div>

  <div class="mt-6">
    <!-- No elements -->
    <div class="w-full mx-auto bg-white rounded-lg" v-if="form.elements.length === 0">
      <div class="card-body p-4">
        <div class="flex flex-col items-center justify-center py-6 text-center">
          <p class="text-lg text-red-600">
            {{ isState ? t('strategicMap.noLeverYet') : t('strategicMap.noAxisYet') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Elements -->
    <div v-else>
      <!-- Expansion Panels -->
      <VExpansionPanels v-model="expanded" class="mt-4 space-y-4">
        <VExpansionPanel
          v-for="(elt, index) in form.elements"
          :key="elt.uuid || index"
          :index="index"
        >
          <!-- Header -->
          <template #title>
            <div class="flex items-center justify-between w-full">
              <h2 class="text-md font-medium text-gray-700 m-0 text-primary-600 font-bold uppercase">
                {{ elementLabel }} {{ elt.order }} – {{ elt.name }}
              </h2>

              <div class="flex items-center gap-4 mr-4">
                <a
                  :href="
                    isState ? `/strategic-levers/show/${elt.id}` : `/strategic-axes/show/${elt.id}`
                  "
                  target="_blank"
                  rel="noopener"
                  class="text-blue-500 hover:text-blue-700 transition-colors"
                  @click.stop
                >
                  <Eye class="w-5 h-5" />
                </a>
              </div>
            </div>
          </template>

          <!-- Body -->
          <template #body>
            <div class="p-2">
              <div class="w-full bg-white mx-auto rounded-lg mb-4 overflow-hidden">
                <!-- Panel header -->
                <div class="flex items-center px-4 py-2 border-b bg-white">
                  <h2 class="text-md font-semibold">
                    {{
                      isState
                        ? t('strategicMap.objectives.leverTitle')
                        : t('strategicMap.objectives.axisTitle')
                    }}
                  </h2>
                </div>

                <!-- Table -->
                <table class="min-w-full table-auto border-collapse">
                  <thead class="bg-gray-50 text-gray-700">
                    <tr>
                      <th class="w-[8%] text-left p-2 border">
                        {{ t('strategicMap.objectives.table.reference') }}
                      </th>
                      <th class="w-[28%] text-left p-2 border">
                        {{ t('strategicMap.objectives.table.name') }}
                      </th>
                      <th class="w-[12%] text-left p-2 border">
                        {{ t('strategicMap.objectives.table.startDate') }}
                      </th>
                      <th class="w-[12%] text-left p-2 border">
                        {{ t('strategicMap.objectives.table.endDate') }}
                      </th>
                      <th class="w-[15%] text-left p-2 border">
                        {{ t('common.table.status.label') }}
                      </th>
                      <th class="w-[15%] text-left p-2 border">
                        {{ t('common.table.state') }}
                      </th>
                      <th class="w-[10%] text-center p-2 border">
                        {{ t('common.table.actions') }}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <!-- No objectives -->
                    <tr v-if="!elt.objectives || elt.objectives.length === 0">
                      <td
                        colspan="7"
                        class="bg-white text-center py-4 text-gray-500 border border-gray-100"
                      >
                        {{ t('strategicMap.objectives.table.noData') }}
                      </td>
                    </tr>

                    <!-- Objectives -->
                    <tr
                      v-for="objective in elt.objectives"
                      :key="objective.uuid"
                      class="even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <td class="px-4 py-2 border-t border-gray-200">
                        {{ objective.reference }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200 truncate max-w-[280px]">
                        {{ objective.name }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200">
                        {{ objective.start_date }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200">
                        {{ objective.end_date }}
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200">
                        <StatusBadge :status="objective.status" />
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200">
                        <StatusBadge :status="objective.state" />
                      </td>
                      <td class="px-4 py-2 border-t border-gray-200 text-center">
                        <div class="flex justify-center gap-3">
                          <a
                            :href="`/strategic-objectives/show/${objective.id}`"
                            target="_blank"
                            rel="noopener"
                            class="text-blue-500 hover:text-blue-700 transition-colors"
                            @click.stop
                          >
                            <Eye class="w-5 h-5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </VExpansionPanel>
      </VExpansionPanels>
    </div>
  </div>
</template>

<script setup>
import { useStrategicMapStore } from '@/store';
import Details from './components/Details.vue';
import VExpansionPanels from '@/components/ui/VExpansionPanels.vue';
import VExpansionPanel from '@/components/ui/VExpansionPanel.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { Plus, Edit, TrashIcon, Eye } from 'lucide-vue-next';
const { t } = useI18n();

const store = useStrategicMapStore();
const form = store.form;
const expanded = ref(0);

// Determine if structure is STATE (→ Lever), otherwise Axis
const isState = computed(() => form.structure?.type === 'STATE');

const elementLabel = computed(() =>
  isState.value ? t('strategicMap.labels.lever') : t('strategicMap.labels.axis')
);
</script>
