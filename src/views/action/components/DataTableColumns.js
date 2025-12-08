import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onEdit, onDelete, onView, onCopy, formatCurrency }) {
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
      header: () => t('action.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('name', {
      header: () => t('action.table.name'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('start_date', {
      header: () => t('action.table.startDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('end_date', {
      header: () => t('action.table.endDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('total_budget', {
      header: () => t('action.table.totalBudget'),
      cell: (info) => {
        const row = info.row.original;
        const amount = info.getValue();
        const currency = row.currency;

        return formatCurrency.value(amount, currency);
      },
    }),

    columnHelper.accessor('structure', {
      header: () => t('action.table.structure'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('project_owner', {
      header: () => t('action.table.projectOwner'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('actual_progress_percent', {
      header: () => t('action.table.avancement'),
      cell: (info) => {
        const value = info.getValue();
        return value != null ? `${Number(value).toFixed(2)} %` : '—';
      },
    }),

    columnHelper.accessor('disbursement_rate', {
      enableSorting: false,
      header: () => t('action.table.disbursementRate'),
      cell: (info) => {
        const value = info.getValue();
        return value != null ? `${Number(value).toFixed(2)} %` : '—';
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
        const state = info.getValue();
        return h(StatusBadge, { status: state });
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
