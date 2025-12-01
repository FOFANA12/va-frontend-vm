<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Props
const props = defineProps({
  labels: {
    type: Array,
    required: true,
    default: () => [],
  },
  datasets: {
    type: Array,
    required: true,
    default: () => [],
  },
  unit: {
    type: String,
    default: '%',
  },
  height: {
    type: [Number, String],
    default: 350,
  },
});

// Data dynamique
const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((ds) => ({
    ...ds,
    borderWidth: ds.borderWidth ?? 3,
    tension: ds.tension ?? 0.4,
    pointRadius: ds.pointRadius ?? 4,
    pointHoverRadius: ds.pointHoverRadius ?? 6,
  })),
}));

// Options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const val = context.parsed.y;
          return props.unit ? `${val} ${props.unit}` : val;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => (props.unit ? `${value} ${props.unit}` : value),
      },
    },
  },
}));
</script>

<template>
  <div class="w-full bg-white rounded-lg p-4">
    <Line :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>
