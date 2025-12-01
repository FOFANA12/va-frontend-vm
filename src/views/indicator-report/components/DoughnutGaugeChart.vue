<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  labels: { type: Array, required: true, default: () => [] },
  datasets: { type: Array, required: true, default: () => [] },
  unit: { type: String, default: '%' },
  height: { type: [Number, String], default: 250 },
});

const chartData = computed(() => {
  const achieved = Math.round(props.achieved ?? 0);
  const target = Math.round(props.target ?? 0);
  const remaining = Math.max(target - achieved, 0);

  return {
    labels: props.labels,
    datasets: props.datasets.map((ds) => ({
      ...ds,
      backgroundColor: ds.backgroundColor ?? ['#22c55e', '#e5e7eb'],
      borderWidth: ds.borderWidth ?? 1,
    })),
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  rotation: -90,
  circumference: 360,
  plugins: {
    legend: { display: true, position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed} ${props.unit}`,
      },
    },
  },
};
</script>

<template>
  <div class="w-full bg-white rounded-lg p-4">
    <Doughnut :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>
