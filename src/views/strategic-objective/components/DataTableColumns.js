import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onEdit, onDelete, onView }) {
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
      header: () => t('strategicObjective.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('name', {
      header: () => t('strategicObjective.table.name'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('start_date', {
      header: () => t('strategicObjective.table.startDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('end_date', {
      header: () => t('strategicObjective.table.endDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('structure', {
      header: () => t('strategicObjective.table.structure'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('lead_structure', {
      header: () => t('strategicObjective.table.leadStructure'),
      cell: (info) => info.getValue(),
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
            onView,
            onEdit,
            onDelete,
          })
        ),
    }),
  ];
}
