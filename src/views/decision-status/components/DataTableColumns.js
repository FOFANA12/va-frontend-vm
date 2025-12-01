import { createColumnHelper } from '@tanstack/vue-table';
import RowActions from './RowActions.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { FileDown } from 'lucide-vue-next';

const columnHelper = createColumnHelper();

export function getColumns({ t, onDelete, onView }) {
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

    columnHelper.accessor('status_date', {
      header: () => t('decisionStatus.table.statusDate'),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('status', {
      header: () => t('common.table.status.label'),
      cell: (info) => {
        const status = info.getValue();
        return h(StatusBadge, { status });
      },
    }),

    columnHelper.accessor('download_url', {
      header: () => t('common.table.file.label'),
      cell: (info) => {
        const url = info.getValue();
        if (!url) return h('span', { class: 'text-gray-400' }, '-');
        return h(
          'a',
          {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'flex items-center gap-1 text-primary-600 hover:underline',
          },
          [
            h(FileDown, { size: 16 }),
            h('span', { class: 'text-sm' }, t('common.table.file.download')),
          ]
        );
      },
    }),

    columnHelper.accessor('user', {
      header: () => t('common.author'),
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
          })
        ),
    }),
  ];

  return columns;
}
