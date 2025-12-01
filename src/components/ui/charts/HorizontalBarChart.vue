<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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
    borderWidth: ds.borderWidth ?? 1,
    backgroundColor: ds.backgroundColor ?? 'rgba(59,130,246,0.6)',
  })),
}));

// Options (horizontal bar chart)
const chartOptions = computed(() => ({
  indexAxis: 'y', // 👉 clé pour inverser en horizontal
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
          const val = context.parsed.x;
          return props.unit ? `${val} ${props.unit}` : val;
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        callback: (value) => (props.unit ? `${value} ${props.unit}` : value),
      },
    },
    y: {
      ticks: {
        font: { size: 12 },
      },
    },
  },
  
}));
</script>

<template>
  <div class="w-full bg-white rounded-lg p-4">
    <Bar :data="chartData" :options="chartOptions" :height="height" />
  </div>
</template>
