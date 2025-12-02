<template>
  <div class="card mt-4">
    <div class="w-full mx-auto bg-white rounded-lg" v-if="context === 'edit'">
      <div class="card-header">
        <h2 class="text-xl p-4 pt-2 pb-2">
          {{ t('strategicObjective.sections.statusDetail') }}
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
              editable
              @edit="openStatusModal"
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

    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
      <div class="card-body p-4">
        <div class="grid grid-cols-12 gap-4">
          <!-- Structure -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="structure"
              name="structure"
              v-model="form.structure"
              @update:modelValue="onChangeStructure"
              :label="t('strategicObjective.form.structure')"
              :options="store.structures"
              :placeholder="t('strategicObjective.form.structurePlaceholder')"
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

          <!-- Lead structure -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="lead_structure"
              name="lead_structure"
              v-model="form.lead_structure"
              :label="t('strategicObjective.form.leadStructure')"
              :options="store.leadStructures"
              :placeholder="t('strategicObjective.form.leadStructurePlaceholder')"
              :error="form.errors.get('lead_structure')"
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

          <!-- Structure strategic map -->
          <div class="col-span-12 md:col-span-6">
            <SingleSelect
              id="strategic_map"
              name="strategic_map"
              v-model="form.strategic_map"
              @update:modelValue="onChangeMap"
              :label="t('strategicObjective.form.strategicMap')"
              :options="strategicMapsFiltered"
              :placeholder="t('strategicObjective.form.strategicMapPlaceholder')"
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

          <!-- Strategic Element (Lever or Axis) -->
          <div class="col-span-12 md:col-span-6" v-if="form.strategic_map">
            <SingleSelect
              id="strategic_element"
              name="strategic_element"
              v-model="form.strategic_element"
              :label="
                selectedStructure?.type === 'STATE'
                  ? t('strategicObjective.form.strategicLever')
                  : t('strategicObjective.form.strategicAxis')
              "
              :placeholder="
                selectedStructure?.type === 'STATE'
                  ? t('strategicObjective.form.strategicLeverPlaceholder')
                  : t('strategicObjective.form.strategicAxisPlaceholder')
              "
              :options="strategicElementsFiltered"
              :error="form.errors.get('strategic_element')"
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

    <div class="w-full mx-auto mt-6 bg-white rounded-lg">
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

          <!-- Reference -->
          <div v-if="form.reference" class="col-span-12 md:col-span-6 lg:col-span-4">
            <InputReadonly
              id="reference"
              name="reference"
              :label="t('strategicObjective.form.reference')"
              :placeholder="t('strategicObjective.form.reference')"
              :modelValue="form.reference"
              readonly
            />
          </div>

          <!-- Name -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="name"
              name="name"
              :label="t('strategicObjective.form.name')"
              v-model="form.name"
              :placeholder="t('strategicObjective.form.namePlaceholder')"
              :error="form.errors.get('name')"
              :form="form"
              required
            />
          </div>

          <!-- Start date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="start_date"
              name="start_date"
              v-model="form.start_date"
              :label="t('strategicObjective.form.startDate')"
              :placeholder="t('strategicObjective.form.startDatePlaceholder')"
              :error="form.errors.get('start_date')"
              required
            />
          </div>

          <!-- End date -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <DatePicker
              id="end_date"
              name="end_date"
              v-model="form.end_date"
              :label="t('strategicObjective.form.endDate')"
              :placeholder="t('strategicObjective.form.endDatePlaceholder')"
              :error="form.errors.get('end_date')"
              required
            />
          </div>

          <!-- Priority level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="priority"
              name="priority"
              v-model="form.priority"
              :label="t('strategicObjective.form.priority')"
              :options="store.priorities"
              :placeholder="t('strategicObjective.form.priorityPlaceholder')"
              :error="form.errors.get('priority')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="code"
              label-key="name"
              filterable
              clearable
              required
            />
          </div>

          <!-- Risk level -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <SingleSelect
              id="risk_level"
              name="risk_level"
              v-model="form.risk_level"
              :label="t('strategicObjective.form.riskLevel')"
              :options="store.riskLevels"
              :placeholder="t('strategicObjective.form.riskLevelPlaceholder')"
              :error="form.errors.get('risk_level')"
              :control-class="'px-3 py-2.5'"
              :dropdown-class="'max-h-60'"
              :option-class="'text-sm'"
              :empty-message="t('common.select.noResults')"
              :search-placeholder="t('common.select.searchPlaceholder')"
              value-key="code"
              label-key="name"
              filterable
              clearable
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
              :label="t('strategicObjective.form.description')"
              :placeholder="t('strategicObjective.form.descriptionPlaceholder')"
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
import { useStrategicObjectiveStore } from '@/store';

const store = useStrategicObjectiveStore();
const strategicMapsFiltered = ref([]);
const strategicElementsFiltered = ref([]);

const selectedStructure = computed(() => store.structures.find((s) => s.uuid === form.structure));

const onChangeStructure = (structureUuid, isInit = false) => {
  if (!isInit) {
    form.lead_structure = null;
    form.strategic_map = null;
    form.strategic_element = null;
  }

  strategicMapsFiltered.value = [];
  strategicElementsFiltered.value = [];
  if (!structureUuid) return;

  strategicMapsFiltered.value = store.strategicMaps.filter(
    (s) => s.structure_uuid === structureUuid
  );

  if (isInit && form.strategic_map) onChangeMap(form.strategic_map, true);
};

const onChangeMap = (strategicMapUuid, isInit = false) => {
  if (!isInit) form.strategic_element = null;

  strategicElementsFiltered.value = [];

  if (!strategicMapUuid) return;

  strategicElementsFiltered.value = store.strategicElements.filter(
    (s) => s.strategic_map_uuid === strategicMapUuid
  );
};

const emit = defineEmits(['open-status-modal']);
const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const openStatusModal = () => {
  emit('open-status-modal', form.id, form.status);
};

const form = store.form;

onMounted(async () => {
  await nextTick();

  if (props.context === 'edit') {
    if (form.structure) onChangeStructure(form.structure, true);
    if (form.strategic_map) onChangeMap(form.strategic_map, true);
  }
});
</script>
  