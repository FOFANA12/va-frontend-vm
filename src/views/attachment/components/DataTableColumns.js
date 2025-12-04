import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';

const columnHelper = createColumnHelper();

export function getColumns({ t, onDelete, onView, attachableType, canAccess, canManage }) {
  const colums = [
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

    columnHelper.accessor('title', {
      header: () => t('attachment.table.title'),
      cell: (info) => {
        const { title, download_url } = info.row.original;
        return h(
          'a',
          {
            href: download_url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'text-blue-400 hover:underline',
          },
          title
        );
      },
    }),

    columnHelper.accessor('original_name', {
      header: () => t('attachment.table.originalName'),
      cell: (info) => {
        const { original_name, download_url } = info.row.original;
        return h(
          'a',
          {
            href: download_url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'text-blue-400 hover:underline',
          },
          original_name
        );
      },
    }),

    columnHelper.accessor('uploaded_at', {
      header: () => t('attachment.table.uploadedAt'),
      cell: (info) => info.getValue(),
    }),
  ];

  if (attachableType === 'actions') {
    colums.push(
      columnHelper.accessor('file_type', {
        header: () => t('attachment.table.fileType'),
        cell: (info) => info.getValue(),
      })
    );
  }

  colums.push(
    columnHelper.accessor('uploaded_by', {
      header: () => t('attachment.table.uploadedBy'),
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
            onView,
            onDelete,
            canAccess,
            canManage,
          })
        ),
    })
  );

  return colums;
}
