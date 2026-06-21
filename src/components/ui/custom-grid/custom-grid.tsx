'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Funnel, FunnelX, Plus, Trash2, Edit } from 'lucide-react';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import Typography from '@/components/ui/typography/Typography';
import { useInfiniteQuery } from '@tanstack/react-query';
import GridSkeleton from './components/grid-skeleton';
import { RowAction } from './types/row-action-type';
import useDebounce from '@/hooks/use-debounce';
import ActionCell from './components/action-cell';
import FilterRenderer from './components/filter-renderer';
import { FilterContext } from './context/filter-context';
import fetchRows from './services/fetch-row';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { ConfirmationModal } from '../confirmation-modal/ConfirmationModal';
import { TopAction } from './types/top-action-type';
import LoadingLinearProgress from '../loading-linear-progress/LoadingLinearProgress';
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}
function isAtBottom({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean {
  return (
    currentTarget.scrollTop + 10 >=
    currentTarget.scrollHeight - currentTarget.clientHeight
  );
}

type GridProps = {
  endpoint: string;
  deleteEndpoint?: string; // Added for delete API
  filters: FilterConfig[];
  title: string;
  Form?: React.ComponentType<{ closeModal: () => void; id?: number }>;
  columns: {
    label: string;
    key: string;
    render?: (row) => React.ReactNode;
  }[];
  rowActions?: RowAction[]; // Made optional to include default actions
  topActions?: TopAction[];
  pageSize?: number;
  initialFilters?: Record<string, any>;
  addButtonText?: string;
  modalTitle?: string;
  className?: string;
  TitleIcon: React.ComponentType<{ className?: string }>;
  showTitle?: boolean;
  showRowActions?: boolean;
  showAddTopAction?: boolean;
};

export default function Grid<T>({
  endpoint,
  deleteEndpoint,
  filters: filterConfigs,
  title,
  Form: FormComponent,
  columns,
  rowActions = [], // Default to empty array
  pageSize = 20,
  initialFilters = {},
  addButtonText = 'افزودن',
  modalTitle = 'افزودن',
  topActions,
  className = '',
  TitleIcon,
  showTitle = true,
  showRowActions = true,
  showAddTopAction = true,
}: GridProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Initialize filters state
  const [filters, setFilters] = useState(() => ({
    enabled: false,
    ...Object.fromEntries(
      filterConfigs.map((config) => [
        config.name,
        initialFilters[config.name] || '',
      ])
    ),
  }));

  // Debounce filter values
  const debouncedFilters = useDebounce(filters, 300);

  // Delete mutation
  const { mutateAsync, isPending: loadingDelete } = useEnhancedMutation({
    method: 'DELETE',
    url: `${deleteEndpoint}`,
    mode: 'path',
    invalidateQueries: [endpoint, deleteId?.toString() ?? ''],

    // mutationFn: (id: string) => axios.delete(`${deleteEndpoint}/${id}`),
    onSuccess: () => {
      // Invalidate query to refresh data
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    },
  });

  // Default row actions
  const defaultRowActions: RowAction[] = [
    {
      icon: Edit,
      title: 'ویرایش',
      callback: (row) => {
        setSelectedId(row.id);
        openModal();
      },
    },
    {
      icon: Trash2,
      title: 'حذف',
      callback: (row) => {
        setDeleteId(row.id);
        setIsDeleteModalOpen(true);
      },
    },
  ];
  // Combine default and custom row actions
  const combinedRowActions = [...defaultRowActions, ...rowActions];

  // Build columns configuration
  const gridColumns = useMemo(() => {
    const columnConfigs = columns.map((colKey) => {
      const filterConfig = filterConfigs.find((f) => f.name === colKey.key);

      return {
        key: colKey.key,
        name: colKey.label,
        renderCell: ({ row }) =>
          colKey.render ? (
            <>{colKey.render(row)}</>
          ) : (
            <span>{getNestedValue(row, colKey.key) ?? ''}</span>
          ),
        ...(filterConfig
          ? {
              renderHeaderCell: (props) => (
                <FilterRenderer
                  {...props}
                  column={{ key: colKey.key, name: colKey.label }}
                  filterConfig={filterConfig}
                />
              ),
            }
          : {}),
      };
    });

    // Add actions column
    return showRowActions
      ? [
          ...columnConfigs,
          {
            key: 'actions',
            name: '',
            width: 80,
            renderCell: ({ row }) => (
              <ActionCell row={row} rowActions={combinedRowActions} />
            ),
          },
        ]
      : [...columnConfigs];
  }, [columns, filterConfigs, combinedRowActions]);

  // React Query infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['grid', endpoint],
    queryFn: ({ pageParam = 1 }) => {
      const { enabled, ...restFilters } = debouncedFilters ?? {};

      return fetchRows<T>({
        endpoint,
        pageParam,
        filters: enabled ? restFilters : {},
        pageSize,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const previousFilters = useRef(debouncedFilters);
  const [isFilterFetching, setIsFilterFetching] = useState(false);

  useEffect(() => {
    let changed;
    //check if filters.enable is true just compare every thing in filter and previous filter except enabled
    const { enabled: _prevEnabled, ...prevRest } = previousFilters.current;
    const { enabled, ...currRest } = filters;
    if (debouncedFilters?.enabled) {
      changed = JSON.stringify(prevRest) !== JSON.stringify(currRest);
    } else {
      if (_prevEnabled) changed = true;
    }

    if (changed) {
      setIsFilterFetching(true);

      previousFilters.current = debouncedFilters;
    }
  }, [debouncedFilters]);
  useEffect(() => {
    if (isFilterFetching)
      refetch().finally(() => {
        setIsFilterFetching(false);
      });
  }, [isFilterFetching]);

  const rows = data?.pages.flat() ?? [];

  // Filter handlers
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters(() => ({
      enabled: false,
    }));
  };

  const handleToggleFilters = () => {
    setFilters((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
  };

  const handleAdd = () => {
    setSelectedId(null); // Clear selectedId for add
    openModal();
  };

  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    if (!isAtBottom(event)) return;
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      mutateAsync(deleteId);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const rowKeyGetter = (row: any) => row.id;

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(
    (value) => typeof value === 'string' && (value as string).length > 0
  );

  return (
    <div className={`h-full w-full px-3 flex flex-col ${className}`}>
      {/* Header */}
      {showTitle && (
        <div className="w-full h-[80px] rounded-xl  relative  px-3 pb-3 flex justify-between items-center">
          <Typography variant={'h2'} className="flex items-center gap-2">
            <TitleIcon className="size-6" />
            {title}
          </Typography>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant={'outline'} onClick={handleClearFilters}>
                <FunnelX />
                حذف فیلترها
              </Button>
            )}
            {!!filterConfigs?.length && (
              <Button variant={'outline'} onClick={handleToggleFilters}>
                <Funnel />
                فیلتر
              </Button>
            )}
            {showAddTopAction && (
              <Button variant={'primary'} onClick={handleAdd}>
                <Plus />
                {addButtonText}
              </Button>
            )}
            {topActions?.map(
              ({ callback, icon: Icon, title, buttonVariant }) => (
                <Button
                  key={title}
                  variant={buttonVariant ?? 'primary'}
                  onClick={() => callback(debouncedFilters)}
                >
                  <Icon />
                  {title}
                </Button>
              )
            )}
          </div>
        </div>
      )}
      {/* Grid */}
      <div className=" h-full relative ">
        <FilterContext.Provider
          value={{ ...filters, onFilterChange: handleFilterChange }}
        >
          {/* {isLoading && rows.length === 0 ? (
            <GridSkeleton />
          ) : ( */}
          {isLoading && !isFetchingNextPage && !isFilterFetching ? (
            <GridSkeleton />
          ) : (
            <>
              <DataGrid
                onScroll={handleScroll}
                columns={gridColumns}
                direction="rtl"
                rows={rows}
                defaultColumnOptions={{
                  sortable: true,
                  resizable: true,
                }}
                rowKeyGetter={rowKeyGetter}
                style={{ maxHeight: '80vh', height: '97%', width: '100%' }}
                rowHeight={45}
                headerRowHeight={filters.enabled ? 70 : 50}
              />
              {isFilterFetching && (
                <div
                  className="absolute left-0 right-0 bottom-0 flex items-center justify-center bg-white/40 dark:bg-white/50 backdrop-blur-sm"
                  style={{ top: filters.enabled ? 70 : 50 }}
                >
                  <div className="animate-spin rounded-full h-9 w-9 border-b-4 border-brand-500 mx-4"></div>
                  <span className="ml-2 text-brand-600">
                    در حال فیلتر کردن...
                  </span>
                </div>
              )}
            </>
          )}

          {isFetchingNextPage && (
            <div className="  ">
              <LoadingLinearProgress />
            </div>
          )}
        </FilterContext.Provider>
      </div>
      {/* Add/Edit Modal */}
      {FormComponent && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            closeModal();
            setSelectedId(null); // Clear selectedId on close
          }}
          className="max-w-[700px] m-4"
          title={selectedId ? 'ویرایش' : modalTitle}
        >
          <FormComponent closeModal={closeModal} id={selectedId ?? undefined} />
        </Modal>
      )}
      {/* Delete Confirmation Modal */}
      {showRowActions && (
        <ConfirmationModal
          loading={loadingDelete}
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          buttonType="yesNo"
          message="آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟"
          modalType="delete"
        />
      )}
    </div>
  );
}
