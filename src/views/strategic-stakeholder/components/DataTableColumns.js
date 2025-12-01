import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';

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

    columnHelper.accessor('organization', {
      header: () => t('strategicStakeholder.form.organization'),
      cell: (info) => info.getValue() || '-',
    }),

    columnHelper.accessor('responsible', {
      header: () => t('strategicStakeholder.form.responsible'),
      cell: (info) => info.getValue() || '-',
    }),

    columnHelper.accessor('email', {
      header: () => t('strategicStakeholder.form.email'),
      cell: (info) => info.getValue() || '-',
    }),

    columnHelper.accessor('phone', {
      header: () => t('strategicStakeholder.form.phone'),
      cell: (info) => info.getValue() || '-',
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
