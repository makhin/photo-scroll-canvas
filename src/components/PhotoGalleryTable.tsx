import React, { useMemo, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnSizingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Photo } from '@/types/photo';
import { BadgeTag } from '@/components/ui/badge-tag';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

interface PhotoGalleryTableProps {
  photos: Photo[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}

export const PhotoGalleryTable: React.FC<PhotoGalleryTableProps> = ({
  photos,
  onLoadMore,
  hasNextPage,
  isLoading,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columns = useMemo<ColumnDef<Photo>[]>(
    () => [
      {
        accessorKey: 'thumbnail',
        header: 'Thumb',
        cell: ({ getValue }) => (
          <div className="flex items-center justify-center">
            <img
              src={getValue() as string}
              alt="Thumbnail"
              className="w-[50px] h-[50px] object-cover rounded-md border border-thumbnail-border shadow-sm"
            />
          </div>
        ),
        size: 80,
        minSize: 60,
        maxSize: 120,
        enableSorting: false,
        enableResizing: true,
      },
      {
        accessorKey: 'path',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-medium text-gallery-header hover:text-primary transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Path
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ getValue }) => (
          <div className="font-mono text-sm text-muted-foreground truncate max-w-[200px]">
            {getValue() as string}
          </div>
        ),
        size: 250,
        minSize: 150,
        maxSize: 400,
        enableResizing: true,
      },
      {
        accessorKey: 'caption',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-medium text-gallery-header hover:text-primary transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Caption
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ getValue }) => (
          <div className="text-sm text-foreground max-w-[300px] truncate">
            {getValue() as string}
          </div>
        ),
        size: 350,
        minSize: 200,
        maxSize: 500,
        enableResizing: true,
      },
      {
        accessorKey: 'takenDate',
        header: ({ column }) => (
          <button
            className="flex items-center gap-2 font-medium text-gallery-header hover:text-primary transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Taken Date
            <ArrowUpDown className="h-4 w-4" />
          </button>
        ),
        cell: ({ getValue }) => (
          <div className="text-sm text-muted-foreground font-mono">
            {format(getValue() as Date, 'dd.MM.yyyy HH:mm')}
          </div>
        ),
        size: 150,
        minSize: 120,
        maxSize: 200,
        enableResizing: true,
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ getValue }) => (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {(getValue() as string[]).map((tag, index) => (
              <BadgeTag key={index} variant="default" className="text-xs">
                {tag}
              </BadgeTag>
            ))}
          </div>
        ),
        size: 220,
        minSize: 120,
        maxSize: 300,
        enableSorting: false,
        enableResizing: true,
      },
      {
        accessorKey: 'peoples',
        header: 'People',
        cell: ({ getValue }) => (
          <div className="flex flex-wrap gap-1 max-w-[180px]">
            {(getValue() as string[]).map((person, index) => (
              <BadgeTag key={index} variant="secondary" className="text-xs">
                {person}
              </BadgeTag>
            ))}
          </div>
        ),
        size: 200,
        minSize: 120,
        maxSize: 280,
        enableSorting: false,
        enableResizing: true,
      },
      {
        accessorKey: 'flags',
        header: 'Flags',
        cell: ({ getValue }) => (
          <div className="flex flex-wrap gap-1 max-w-[150px]">
            {(getValue() as string[]).map((flag, index) => (
              <BadgeTag key={index} variant="outline" className="text-xs">
                {flag}
              </BadgeTag>
            ))}
          </div>
        ),
        size: 170,
        minSize: 100,
        maxSize: 250,
        enableSorting: false,
        enableResizing: true,
      },
    ],
    []
  );

  const table = useReactTable({
    data: photos,
    columns,
    state: {
      sorting,
      columnSizing,
    },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 80,
    overscan: 10,
  });

  // Load more when near the end
  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1);
    if (
      lastItem &&
      lastItem.index >= rows.length - 10 &&
      hasNextPage &&
      !isLoading &&
      onLoadMore
    ) {
      onLoadMore();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    rows.length,
    hasNextPage,
    isLoading,
    onLoadMore,
  ]);

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-gallery-header to-gallery-header/90 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Photo Gallery</h1>
        <p className="text-white/80 mt-1">
          {photos.length} photos loaded
          {isLoading && " • Loading..."}
        </p>
      </div>

      {/* Table Container */}
      <div
        ref={tableContainerRef}
        className="flex-1 overflow-auto"
        style={{ contain: 'strict' }}
      >
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          {/* Table Header */}
          <div className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <div key={headerGroup.id} className="flex">
                {headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className="px-4 py-3 text-left relative group shrink-0"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 bg-border hover:bg-primary cursor-col-resize opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          transform: header.column.getIsResizing()
                            ? 'scaleX(1.5)'
                            : '',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Virtualized Rows */}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <div
                key={row.id}
                className="absolute top-0 left-0 w-full flex items-center border-b border-border hover:bg-gallery-hover transition-colors duration-150"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="px-4 py-2 flex items-center shrink-0"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="border-t border-border px-6 py-3 bg-muted">
          <div className="flex items-center justify-center text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            Loading more photos...
          </div>
        </div>
      )}
    </div>
  );
};