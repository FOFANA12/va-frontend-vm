import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onEdit, onDelete, onView, formatCurrency, currencyCode }) {
  const columns = [
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

    columnHelper.accessor('contract_number', {
      header: () => t('contract.table.contractNumber'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('title', {
      header: () => t('contract.table.title'),
      cell: (info) => info.getValue() || '—',
    }),

    columnHelper.accessor('start_date', {
      header: () => t('contract.table.startDate'),
      cell: (info) => info.getValue() || '—',
    }),

    columnHelper.accessor('end_date', {
      header: () => t('contract.table.endDate'),
      cell: (info) => info.getValue() || '—',
    }),

    columnHelper.accessor('signed_at', {
      header: () => t('contract.table.signedAt'),
      cell: (info) => info.getValue() || '—',
    }),

    columnHelper.accessor('amount', {
      header: () => t('contract.table.amount'),
      cell: (info) => {
        const value = info.getValue();
        return value != null && formatCurrency ? formatCurrency.value(value, currencyCode) : '—';
      },
    }),

    columnHelper.accessor('status', {
      header: () => t('common.table.status.label'),
      cell: (info) =>
        h(StatusBadge, {
          variant: info.getValue() ? 'success' : 'error',
        }),
    }),
  ];

  columns.push(
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
    })
  );

  return columns;
}
