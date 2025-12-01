import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';

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

    columnHelper.accessor('funding_source', {
      header: () => t('actionFundReceipt.table.fundingSource'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('reference', {
      header: () => t('actionFundReceipt.table.reference'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('receipt_date', {
      header: () => t('actionFundReceipt.table.receiptDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('validity_date', {
      header: () => t('actionFundReceipt.table.validityDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('converted_amount', {
      header: () => t('actionFundReceipt.table.convertedAmount'),
      cell: (info) => {
        const row = info.row.original;
        const amount = info.getValue();
        const currency = row.currency;

        if (amount == null || isNaN(amount)) return '-';

        return currency ? formatCurrency.value(amount, currency) : formatNumber.value(amount);
      },
    }),

    columnHelper.display({
      id: 'actionFundReceipt',
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
