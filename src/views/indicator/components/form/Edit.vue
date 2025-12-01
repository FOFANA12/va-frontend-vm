<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg" v-if="context === 'edit'">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('indicator.sections.statusDetail') }}
        </h2>
        <hr class="border-t border-gray-200 w-full mb-0" />
      </div>
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Status -->
          <div class="col-span-12 md:col-span-4">
            <StatusField
              :status="form.status"
              :label="t('common.form.status')"
              :placeholder="t('common.form.status')"
              display-key="label"
            />
          </div>

          <!-- Status Changed At -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="status_changed_at"
              name="status_changed_at"
              :label="t('common.form.statusChangedAt')"
              :model-value="form?.status_changed_at || '-'"
            />
          </div>

          <!-- Status Changed By -->
          <div class="col-span-12 md:col-span-4">
            <InputReadonly
              id="status_changed_by"
              name="status_changed_by"
              :label="t('common.form.statusChangedBy')"
              :model-value="form.status_changed_by || '-'"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12">
            <SingleSelect
              v-if="context !== 'edit'"
              id="structure"
              name="structure"
              v-model="form.structure"
              @update:modelValue="onChangeStructure"
              :label="t('indicator.form.structure')"
              :options="store.structures"
              :placeholder="t('indicator.form.structurePlaceholder')"
              :error="form.errors.get('structure')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
            <InputReadonly
              v-else
              id="structure"
              name="structure"
              :label="t('indicator.form.structure')"
              :placeholder="t('indicator.form.structurePlaceholder')"
              :modelValue="form.structure?.name"
            />
          </div>

          <!-- Strategic map -->
          <div class="col-span-12">
            <SingleSelect
              v-if="context !== 'edit'"
              id="strategic_map"
              name="strategic_map"
              v-model="form.strategic_map"
              @update:modelValue="onChangeStrategicMap"
              :label="t('indicator.form.strategicMap')"
              :options="strategicMapsFiltered"
              :placeholder="t('indicator.form.strategicMapPlaceholder')"
              :error="form.errors.get('strategic_map')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
            <InputReadonly
              v-else
              id="strategic_map"
              name="strategic_map"
              :label="t('indicator.form.strategicMap')"
              :placeholder="t('indicator.form.structurePlaceholder')"
              :modelValue="form.strategic_map"
            />
          </div>

          <!-- Strategic Element (Lever or Axis) -->
          <div class="col-span-12" v-if="form.strategic_map">
            <SingleSelect
              v-if="context !== 'edit'"
              id="strategic_element"
              name="strategic_element"
              v-model="form.strategic_element"
              :options="strategicElementsFiltered"
              @update:modelValue="onChangeStrategicElement"
              :label="
                selectedStructure?.type === 'STATE'
                  ? t('indicator.form.strategicLever')
                  : t('indicator.form.strategicAxis')
              "
              :placeholder="
                selectedStructure?.type === 'STATE'
                  ? t('indicator.form.strategicLeverPlaceholder')
                  : t('indicator.form.strategicAxisPlaceholder')
              "
              :error="form.errors.get('strategic_element')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
            <InputReadonly
              v-else
              id="strategic_element"
              name="strategic_element"
              :label="
                selectedStructure?.type === 'STATE'
                  ? t('indicator.form.strategicLever')
                  : t('indicator.form.strategicAxis')
              "
              :placeholder="
                selectedStructure?.type === 'STATE'
                  ? t('indicator.form.strategicLeverPlaceholder')
                  : t('indicator.form.strategicAxisPlaceholder')
              "
              :modelValue="form.strategic_element"
            />
          </div>

          <!-- Strategic objective -->
          <div class="col-span-12" v-if="form.strategic_element">
            <SingleSelect
              v-if="context !== 'edit'"
              id="strategic_objective"
              name="strategic_objective"
              v-model="form.strategic_objective"
              :label="t('indicator.form.strategicObjective')"
              :options="strategicObjectivesFiltered"
              :placeholder="t('indicator.form.strategicObjectivePlaceholder')"
              :error="form.errors.get('strategic_objective')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
            <InputReadonly
              v-else
              id="strategic_objective"
              name="strategic_objective"
              :label="t('indicator.form.strategicObjective')"
              :placeholder="t('indicator.form.strategicObjectivePlaceholder')"
              :modelValue="form.strategic_objective"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mx-auto bg-white rounded-lg my-6">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Auteur -->
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4"
            v-if="form.author && context !== 'copy'"
          >
            <InputReadonly
              id="author"
              name="author"
              :label="t('common.form.author')"
              :model-value="form.author"
            />
          </div>

          <!-- Reference -->
          <div
            v-if="form.reference && context !== 'copy'"
            class="col-span-12 md:col-span-6 lg:col-span-4"
          >
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('indicator.form.reference')"
              :placeholder="t('indicator.form.reference')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('indicator.form.name')"
              v-model="form.name"
              :placeholder="t('indicator.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Initial value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="initial_value"
              name="initial_value"
              :label="t('indicator.form.initialValue')"
              v-model="form.initial_value"
              :placeholder="t('indicator.form.initialValuePlaceholder')"
              :error="form.errors.get('initial_value')"
              :form="form"
              required
            />
          </div>

          <!-- Final target value -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="final_target_value"
              name="final_target_value"
              :label="t('indicator.form.finalTargetValue')"
              v-model="form.final_target_value"
              :placeholder="t('indicator.form.finalTargetValuePlaceholder')"
              :error="form.errors.get('final_target_value')"
              :form="form"
              required
            />
          </div>

          <!-- Achieved value -->
          <!-- <div v-if="context === 'edit'" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="achieved_value"
              name="achieved_value"
              :label="t('indicator.form.achievedValue')"
              :modelValue="form.achieved_value"
              :placeholder="t('indicator.form.achievedValuePlaceholder')"
            />
          </div> -->

          <!-- Unit -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="unit"
              name="unit"
              :label="t('indicator.form.unit')"
              v-model="form.unit"
              :placeholder="t('indicator.form.unitPlaceholder')"
              :error="form.errors.get('unit')"
              :form="form"
              required
            />
          </div>

          <!-- Categorie -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="category"
              name="category"
              v-model="form.category"
              :label="t('indicator.form.category')"
              :options="store.categories"
              :placeholder="t('indicator.form.categoryPlaceholder')"
              :error="form.errors.get('category')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="uuid"
              label-key="name"
              required
            />
          </div>

          <!-- Charte type -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="chart_type"
              name="chart_type"
              v-model="form.chart_type"
              :label="t('indicator.form.chartType')"
              :options="store.chartTypes"
              :placeholder="t('indicator.form.chartTypePlaceholder')"
              :error="form.errors.get('chart_type')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              clearable
              filterable
              value-key="code"
              label-key="name"
              required
            />
          </div>

          <!-- State -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4" v-if="context === 'edit'">
            <StatusField
              :status="form.state"
              :label="t('common.form.state')"
              :placeholder="t('common.form.state')"
              display-key="label"
            />
          </div>

          <!-- Description -->
          <div class="col-span-12">
            <Textarea
              id="description"
              name="description"
              v-model="form.description"
              :label="t('indicator.form.description')"
              :placeholder="t('indicator.form.descriptionPlaceholder')"
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
import { useIndicatorStore } from '@/store';

const store = useIndicatorStore();
const emit = defineEmits(['open-status-modal']);
const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const form = store.form;
const strategicMapsFiltered = ref([]);
const strategicElementsFiltered = ref([]);
const strategicObjectivesFiltered = ref([]);

const selectedStructure = computed(() => {
  if (!form.structure) return null;

  if (props.context === 'edit' && typeof form.structure === 'object') {
    return form.structure;
  }

  return store.structures.find((s) => s.uuid === form.structure) || null;
});

const openStatusModal = () => {
  emit('open-status-modal', form.id, form.status);
};

const onChangeStructure = (structureUuid, isInit = false) => {
  if (!isInit) {
    form.strategic_map = null;
    form.strategic_element = null;
    form.strategic_objective = null;
  }

  strategicMapsFiltered.value = [];
  strategicElementsFiltered.value = [];
  strategicObjectivesFiltered.value = [];

  strategicMapsFiltered.value = store.strategicMaps.filter(
    (map) => map.structure_uuid === structureUuid
  );

  if (isInit && form.strategic_map) {
    onChangeStrategicMap(form.strategic_map, true);
  }
};

const onChangeStrategicMap = (strategicMapUuid, isInit = false) => {
  if (!isInit) {
    form.strategic_element = null;
    form.strategic_objective = null;
  }

  strategicElementsFiltered.value = [];
  strategicObjectivesFiltered.value = [];

  if (!strategicMapUuid) return;

  const selectedMap = store.strategicMaps.find((map) => map.uuid === strategicMapUuid);
  strategicElementsFiltered.value = selectedMap?.elements || [];

  if (isInit && form.strategic_element) {
    onChangeStrategicElement(form.strategic_element, true);
  }
};

const onChangeStrategicElement = (strategicElementUuid, isInit = false) => {
  if (!isInit) {
    form.strategic_objective = null;
  }

  strategicObjectivesFiltered.value = [];

  if (!strategicElementUuid) return;

  const selectedElement = strategicElementsFiltered.value.find(
    (elt) => elt.uuid === strategicElementUuid
  );

  strategicObjectivesFiltered.value = selectedElement?.objectives || [];
};

onMounted(() => {
  if (props.context === 'copy') {
    if (form.structure) onChangeStructure(form.structure, true);
    if (form.strategic_map) onChangeStrategicMap(form.strategic_map, true);
    if (form.strategic_element) onChangeStrategicElement(form.strategic_element, true);
  }
});
</script>
  