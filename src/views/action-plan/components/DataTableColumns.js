import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onCopy, onEdit, onDelete, onView, onExport }) {
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
      header: () => t('actionPlan.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('name', {
      header: () => t('actionPlan.table.name'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('structure', {
      header: () => t('actionPlan.table.structure'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('responsible', {
      header: () => t('actionPlan.table.responsible'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('start_date', {
      header: () => t('actionPlan.table.startDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('end_date', {
      header: () => t('actionPlan.table.endDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('status', {
      header: () => t('common.table.status.label'),
      cell: (info) =>
        h(StatusBadge, {
          variant: info.getValue() ? 'success' : 'error',
        }),
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
            onExport,
            onView,
            onEdit,
            onDelete,
          })
        ),
    }),
  ];
}
