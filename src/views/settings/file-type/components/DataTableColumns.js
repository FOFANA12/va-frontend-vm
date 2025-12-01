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

    columnHelper.accessor('name', {
      header: () => t('settings.fileType.table.name'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('original_name', {
      header: () => t('attachment.table.originalName'),
      cell: (info) => {
        const row = info.row.original;
        const originalName = row.original_name;
        const downloadUrl = row.download_url;

        if (!originalName || !downloadUrl) {
          return h(
            'span',
            { class: 'text-red-500 font-medium' },
            t('attachment.table.noFile')
          );
        }

        return h(
          'a',
          {
            href: downloadUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'text-blue-500 hover:underline',
          },
          originalName
        );
      },
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
