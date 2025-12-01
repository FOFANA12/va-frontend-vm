<script setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  labels: { type: Array, required: true, default: () => [] },
  datasets: { type: Array, required: true, default: () => [] },
  unit: { type: String, default: '%' },
  height: { type: [Number, String], default: 350 },
});

const chartData = computed(() => {
  return {
    labels: props.labels,
    datasets: props.datasets.map((ds) => ({
      ...ds,
      backgroundColor: ds.backgroundColor ?? ['#3b82f6', '#22c55e'],
      borderWidth: ds.borderWidth ?? 1,
    })),
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: 180, // start to left (180°)
  circumference: 360, // circle
  plugins: {
    legend: { display: true, position: 'top' },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed} ${props.unit}`,
      },
    },
  },
};
</script>

<template>
  <div class="w-full bg-white rounded-lg p-4 flex justify-center">
    <Pie :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>
