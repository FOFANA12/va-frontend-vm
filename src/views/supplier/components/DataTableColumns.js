import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import CustomStarRating from '@/components/ui/CustomStarRating.vue';

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

    columnHelper.accessor('company_name', {
      header: () => t('supplier.table.companyName'),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: () => t('supplier.table.name'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('phone', {
      header: () => t('supplier.table.phone'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('email', {
      header: () => t('supplier.table.email'),
      cell: (info) => info.getValue() || '—',
    }),
    columnHelper.accessor('tax_number', {
      header: () => t('supplier.table.taxNumber'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('note', {
      header: () => t('supplier.table.note'),
      cell: (info) =>
        h(CustomStarRating, {
          modelValue: info.getValue(),
          readOnly: true,
          allowHalf: true,
          starSize: 18,
        }),
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
            onView,
            onEdit,
            onDelete,
          })
        ),
    }),
  ];
}
