import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import CustomStarRating from '@/components/ui/CustomStarRating.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onEdit, onDelete, onView }) {
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

    columnHelper.accessor('score_delay', {
      header: () => t('supplierEvaluation.table.scoreDelay'),
      cell: (info) =>
        h(CustomStarRating, {
          modelValue: Number(info.getValue()),
          readOnly: true,
          starSize: 18,
        }),
    }),

    columnHelper.accessor('score_price', {
      header: () => t('supplierEvaluation.table.scorePrice'),
      cell: (info) =>
        h(CustomStarRating, {
          modelValue: Number(info.getValue()),
          readOnly: true,
          starSize: 18,
        }),
    }),

    columnHelper.accessor('score_quality', {
      header: () => t('supplierEvaluation.table.scoreQuality'),
      cell: (info) =>
        h(CustomStarRating, {
          modelValue: Number(info.getValue()),
          readOnly: true,
          starSize: 18,
        }),
    }),

    columnHelper.accessor('total_score', {
      header: () => t('supplierEvaluation.table.totalScore'),
      cell: (info) =>
        h(CustomStarRating, {
          modelValue: Number(info.getValue()),
          readOnly: true,
          allowHalf: true,
          starSize: 18,
        }),
    }),

    columnHelper.accessor('evaluated_at', {
      header: () => t('supplierEvaluation.table.evaluatedAt'),
      cell: (info) => info.getValue(),
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
