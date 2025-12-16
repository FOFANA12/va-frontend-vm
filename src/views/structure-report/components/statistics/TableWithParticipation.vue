<template>
  <table class="w-full text-sm border-collapse">
    <thead>
      <tr class="bg-white text-left">
        <th class="px-4 py-2 border-b border-gray-200">{{ t('report.label') }}</th>
        <th class="px-4 py-2 border-b border-gray-200">{{ t('report.totalAmount') }}</th>
        <th class="px-4 py-2 border-b border-gray-200">{{ t('report.participationRate') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.uuid || item.id || item[labelKey]"
        class="hover:bg-gray-50 bg-white"
      >
        <!-- Libellé -->
        <td class="px-4 py-2 border-b border-gray-200">
          {{ item[labelKey] }}
        </td>

        <!-- Montant -->
        <td class="px-4 py-2 border-b border-gray-200 font-bold">
          {{ formatCurrency(item[valueKey], currency) }}
        </td>

        <!-- Taux de participation -->
        <td class="px-4 py-2 border-b border-gray-200 text-blue-600 font-semibold">
          {{ calcParticipation(item[valueKey], total) }} %
        </td>
      </tr>

      <!-- Message si pas de données -->
      <tr v-if="items.length === 0" class="bg-white">
        <td colspan="3" class="text-center text-gray-400 py-4">
          {{ t('report.noData') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { formatCurrency } = useCurrencyFormatter();

const props = defineProps({
  items: { type: Array, default: () => [] },
  labelKey: { type: String, required: true }, // ex: 'name'
  valueKey: { type: String, required: true }, // ex: 'total_amount'
  total: { type: Number, required: true }, // somme totale pour % participation
  currency: { type: String, default: 'MRU' }, // devise pour formatCurrency
});

/**
 * Calcule le pourcentage de participation
 */
function calcParticipation(amount, total) {
  if (!total || total === 0) return 0;
  return ((Number(amount) || 0) / total * 100).toFixed(1);
}
</script>
