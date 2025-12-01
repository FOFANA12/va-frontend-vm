<template>
  <div class="card mt-4">
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
              :options="filteredStructures"
              :label="t('strategicLever.form.structure')"
              :placeholder="t('strategicLever.form.structurePlaceholder')"
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
              :label="t('strategicLever.form.strategicMap')"
              :placeholder="t('strategicLever.form.strategicMapPlaceholder')"
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

          <!-- Order -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <Input
              id="order"
              name="order"
              :label="t('strategicLever.form.order')"
              v-model="form.order"
              :placeholder="t('strategicLever.form.orderPlaceholder')"
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
              :label="t('strategicLever.form.abbreviation')"
              v-model="form.abbreviation"
              :placeholder="t('strategicLever.form.abbreviationPlaceholder')"
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
              :label="t('strategicLever.form.name')"
              v-model="form.name"
              :placeholder="t('strategicLever.form.namePlaceholder')"
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
              :label="t('strategicLever.form.description')"
              :placeholder="t('strategicLever.form.descriptionPlaceholder')"
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
import { useStrategicLeverStore } from '@/store';

const store = useStrategicLeverStore();

const props = defineProps({
  context: {
    type: String,
    required: false,
    default: 'create',
  },
});

const filteredStructures = ref([]);
const filteredMaps = ref([]);
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

onMounted(async () => {
  await nextTick();

  filteredStructures.value = store.structures.filter((s) => s.type === 'STATE');

  if (props.context === 'edit') {
    if (form.structure) onChangeStructure(form.structure, true);
  }
});
</script>
  