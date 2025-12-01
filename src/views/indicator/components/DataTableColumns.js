import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

import {
  ChartColumnBig,
  ChartLine,
  PieChart as ChartPie,
  Gauge,
  Table as TableIcon,
} from 'lucide-vue-next';

const chartIcons = {
  BAR: ChartColumnBig,
  LINE: ChartLine,
  PIE: ChartPie,
  GAUGE: Gauge,
  TABLE: TableIcon,
};

const columnHelper = createColumnHelper();

export function getColumns({ t, onEdit, onDelete, onView, onCopy }) {
  return [
    columnHelper.display({
      id: 'select',
      enableResizing: false,
      enableSorting: false,
      header: ({ table }) =>
        h('div', { class: 'w-5 flex justify-center' }, [
          h('input', {
            type: 'checkbox',
            class: 'checkbox-primary h-4 w-4',
            checked: table.getIsAllPageRowsSelected(),
            indeterminate: table.getIsSomePageRowsSelected(),
            onChange: table.getToggleAllPageRowsSelectedHandler(),
          }),
        ]),
      cell: ({ row }) =>
        h('div', { class: 'w-5 flex justify-center' }, [
          h('input', {
            type: 'checkbox',
            class: 'checkbox-primary h-4 w-4',
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }),
        ]),
    }),

    columnHelper.accessor('reference', {
      header: () => t('indicator.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('structure', {
      header: () => t('indicator.table.structure'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('lead_structure', {
      header: () => t('indicator.table.leadStructure'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('initial_value', {
      header: () => t('indicator.table.initialValue'),
      cell: (info) => {
        const row = info.row.original;
        return h('span', {}, `${info.getValue()} ${row.unit ?? ''}`);
      },
    }),

    columnHelper.accessor('final_target_value', {
      header: () => t('indicator.table.finalTargetValue'),
      cell: (info) => {
        const row = info.row.original;
        return h('span', {}, `${info.getValue()} ${row.unit ?? ''}`);
      },
    }),

    columnHelper.accessor('achieved_value', {
      header: () => t('indicator.table.achievedValue'),
      cell: (info) => {
        const row = info.row.original;
        return h('span', {}, `${info.getValue()} ${row.unit ?? ''}`);
      },
    }),

    columnHelper.accessor('chart_type', {
      header: () => t('indicator.table.chartType'),
      cell: (info) => {
        const chartType = info.getValue();
        const Icon = chartIcons[chartType?.code] ?? null;

        return h('div', { class: 'flex items-center space-x-2' }, [
          Icon ? h(Icon, { class: 'w-4 h-4 text-green-500' }) : null,
          h('span', {}, chartType?.label ?? ''),
        ]);
      },
    }),

    columnHelper.accessor('status', {
      header: () => t('common.table.status.label'),
      cell: (info) => {
        const status = info.getValue();
        return h(StatusBadge, { status });
      },
    }),

    columnHelper.accessor('state', {
      header: () => t('common.table.state'),
      cell: (info) => {
        const status = info.getValue();
        return h(StatusBadge, { status });
      },
    }),

    columnHelper.display({
      id: 'actions',
      enableResizing: false,
      enableSorting: false,
      header: () => h('div', { class: 'w-16 text-center' }, t('common.table.actions')),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'w-16 flex justify-center' },
          h(RowActions, {
            row: row.original,
            onCopy,
            onView,
            onEdit,
            onDelete,
          })
        ),
    }),
  ];
}
