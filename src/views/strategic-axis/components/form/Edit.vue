<template>
  <div class="card mt-4">
    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicAxis.sections.alignmentInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Parent structure -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              v-if="context === 'create'"
              id="parent_structure"
              name="parent_structure"
              v-model="form.parent_structure"
              @update:modelValue="onChangeParentStructure"
              :options="parentFilteredStructures"
              :label="t('strategicAxis.form.parentStructure')"
              :placeholder="t('strategicAxis.form.parentStructurePlaceholder')"
              :error="form.errors.get('parent_structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
            <InputReadonly
              v-else
              id="parent_structure"
              name="parent_structure"
              :label="t('strategicAxis.form.parentStructure')"
              :placeholder="t('strategicAxis.form.parentStructurePlaceholder')"
              :modelValue="form.parent_structure?.name"
            />
          </div>

          <!-- Parent map -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              v-if="context === 'create'"
              id="parent_map"
              name="parent_map"
              v-model="form.parent_map"
              :options="parentFilteredMaps"
              @update:modelValue="onChangeParentMap"
              :label="t('strategicAxis.form.parentMap')"
              :placeholder="t('strategicAxis.form.parentMapPlaceholder')"
              :error="form.errors.get('parent_map')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
            <InputReadonly
              v-else
              id="parent_map"
              name="parent_map"
              :label="t('strategicAxis.form.parentMap')"
              :placeholder="t('strategicAxis.form.parentMapPlaceholder')"
              :modelValue="form.parent_map?.name"
            />
          </div>

          <!-- Parent element -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              v-if="context === 'create'"
              id="parent_element"
              name="parent_element"
              v-model="form.parent_element"
              :options="parentFilteredLevers"
              :label="t('strategicAxis.form.parentElement')"
              :placeholder="t('strategicAxis.form.parentElementPlaceholder')"
              :error="form.errors.get('parent_element')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
            <InputReadonly
              v-else
              id="parent_element"
              name="parent_element"
              :label="t('strategicAxis.form.parentElement')"
              :placeholder="t('strategicAxis.form.parentElementPlaceholder')"
              :modelValue="form.parent_element?.name"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicAxis.sections.AxisInfo') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="structure"
              name="structure"
              v-model="form.structure"
              @update:modelValue="onChangeStructure"
              :options="filteredStructures"
              :label="t('strategicAxis.form.structure')"
              :placeholder="t('strategicAxis.form.structurePlaceholder')"
              :error="form.errors.get('structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Strategic map -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="strategic_map"
              name="strategic_map"
              v-model="form.strategic_map"
              :options="filteredMaps"
              :label="t('strategicAxis.form.strategicMap')"
              :placeholder="t('strategicAxis.form.strategicMapPlaceholder')"
              :error="form.errors.get('strategic_map')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="uuid"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto mt-1 bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Auteur -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="form.author">
            <InputReadonly
              id="author"
              name="author"
              :label="t('common.form.author')"
              :placeholder="t('common.form.author')"
              :model-value="form.author"
            />
          </div>

          <!-- Order -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="order"
              name="order"
              :label="t('strategicAxis.form.order')"
              v-model="form.order"
              :placeholder="t('strategicAxis.form.orderPlaceholder')"
              :error="form.errors.get('order')"
              :form="form"
              required
            />
          </div>

          <!-- Abbreviation -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="abbreviation"
              name="abbreviation"
              :label="t('strategicAxis.form.abbreviation')"
              v-model="form.abbreviation"
              :placeholder="t('strategicAxis.form.abbreviationPlaceholder')"
              :error="form.errors.get('abbreviation')"
              :form="form"
              required
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('strategicAxis.form.name')"
              v-model="form.name"
              :placeholder="t('strategicAxis.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Status -->
          <div class="col-span-12 flex items-center">
            <input
              id="status"
              type="checkbox"
              v-model="form.status"
              class="checkbox-primary h-5 w-5 mr-2"
            />
            <label for="status" class="text-gray-700">
              {{ t('common.form.status') }}
            </label>
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <Textarea
              id="description"
              name="description"
              v-model="form.description"
              :label="t('strategicAxis.form.description')"
              :placeholder="t('strategicAxis.form.descriptionPlaceholder')"
              :error="form.errors.get('description')"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useStrategicAxisStore } from '@/store';

const store = useStrategicAxisStore();

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const filteredStructures = ref([]);
const filteredMaps = ref([]);

const parentFilteredStructures = ref([]);
const parentFilteredMaps = ref([]);
const parentFilteredLevers = ref([]);
const form = store.form;

const onChangeStructure = (structureUuid, isInit = false) => {
  if (!isInit) {
    form.strategic_map = null;
  }

  filteredMaps.value = [];

  if (!structureUuid) return;

  const selectedStructure = filteredStructures.value.find((s) => s.uuid === structureUuid);
  filteredMaps.value = selectedStructure?.strategic_maps || [];

  if (isInit && form.strategic_map) {
    const existingMap = filteredMaps.value.find((m) => m.uuid === form.strategic_map);
    if (!existingMap) form.strategic_map = null;
  }
};

const onChangeParentStructure = (structureUuid) => {
  form.parent_map = null;
  form.parent_element = null;
  parentFilteredMaps.value = [];
  parentFilteredLevers.value = [];

  if (!structureUuid) return;

  const selectedStructure = parentFilteredStructures.value.find((s) => s.uuid === structureUuid);
  parentFilteredMaps.value = selectedStructure?.strategic_maps || [];
};

const onChangeParentMap = (mapUuid) => {
  form.parent_element = null;
  parentFilteredLevers.value = [];

  if (!mapUuid) return;

  const map = parentFilteredMaps.value.find((m) => m.uuid === mapUuid);
  parentFilteredLevers.value = map?.elements?.filter((el) => el.type === 'LEVER') || [];
};

onMounted(async () => {
  await nextTick();

  parentFilteredStructures.value = store.structures.filter((s) => s.type === 'STATE');
  filteredStructures.value = store.structures.filter((s) => s.type === 'STRATEGIC');

  if (props.context === 'edit') {
    if (form.structure) onChangeStructure(form.structure, true);
  }
});
</script>
  