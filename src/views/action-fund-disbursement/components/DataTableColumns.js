import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';

const columnHelper = createColumnHelper();

export function getColumns({
  t,
  onEdit,
  onDelete,
  onView,
  formatCurrency,
  formatNumber,
  onExport,
}) {
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

    columnHelper.accessor('action', {
      header: () => t('actionFundReceipt.table.action'),
      cell: (info) => {
        const action = info.getValue();
        if (!action) return '-';

        return h(
          'a',
          {
            href: `/actions/show/${action.id}`,
            target: '_blank',
            rel: 'noopener noreferrer',
            title: action.name,
            class: 'text-primary hover:underline',
          },
          `${action.reference}`
        );
      },
    }),

    columnHelper.accessor('reference', {
      header: () => t('actionFundDisbursement.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('contract_number', {
      header: () => t('actionFundDisbursement.table.contract'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('operation_number', {
      header: () => t('actionFundDisbursement.table.operationNumber'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('execution_date', {
      header: () => t('actionFundDisbursement.table.executionDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('supplier', {
      header: () => t('actionFundDisbursement.table.supplier'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('payment_amount', {
      header: () => t('actionFundDisbursement.table.paymentAmount'),
      cell: (info) => {
        const row = info.row.original;
        const amount = info.getValue();
        const currency = row.currency;

        if (amount == null || isNaN(amount)) return '-';

        return currency ? formatCurrency.value(amount, currency) : formatNumber.value(amount);
      },
    }),

    columnHelper.accessor('payment_date', {
      header: () => t('actionFundDisbursement.table.paymentDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('phase', {
      header: () => t('actionFundDisbursement.table.phase'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('task', {
      header: () => t('actionFundDisbursement.table.task'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('payment_mode', {
      header: () => t('actionFundDisbursement.table.paymentMode'),
      cell: (info) => info.getValue(),
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
            onExport,
            onView,
            onEdit,
            onDelete,
          })
        ),
    }),
  ];
}
