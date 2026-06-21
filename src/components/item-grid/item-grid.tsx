'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import { ConfirmationModal } from '@/components/ui/confirmation-modal/ConfirmationModal';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import Typography from '../ui/typography/Typography';
import { Modal } from '../ui/modal';
import { useModal } from '@/hooks/useModal';

export interface ItemGridProps<T> {
  title: string;
  fetchUrl: string;
  createUrl: string;
  deleteUrl: string;
  renderCard?: (item: T) => React.ReactNode;
  mapItemToName?: (item: T) => string;
  useEditModal?: boolean;
  modalTitle?: string;
  FormComponent?: React.ComponentType<{
    closeModal: () => void;
    id?: number;
    onSubmit: (values) => void;
  }>;
}

export function ItemGrid<T extends { id: number }>({
  title,
  fetchUrl,
  createUrl,
  deleteUrl,
  renderCard,
  mapItemToName,
  useEditModal = false,
  modalTitle,
  FormComponent,
}: ItemGridProps<T>) {
  const { data, isLoading } = useEnhancedQuery<{ result: T[] }>({
    url: fetchUrl,
    method: 'GET',
  });
  const { isOpen, openModal, closeModal } = useModal();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [adding, setAdding] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { mutateAsync, isPending } = useEnhancedMutation({
    method: editingId ? 'PATCH' : 'POST',
    url: editingId ? `${createUrl}/${editingId}/` : createUrl,
    invalidateQueries: [fetchUrl],
  });

  const { mutateAsync: deleteItem, isPending: loadingDelete } =
    useEnhancedMutation({
      method: 'DELETE',
      url: deleteUrl,
      mode: 'path',
      invalidateQueries: [fetchUrl],
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      },
    });

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleSubmitEdit = (values = undefined) => {
    if (values || editValue.trim()) {
      mutateAsync(values ?? { name: editValue });
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleAdd = (values = undefined) => {
    if (values || newValue.trim()) {
      mutateAsync(values ?? { name: newValue }).then(() => {
        setAdding(false);
        setNewValue('');
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) deleteItem(deleteId);
  };

  return (
    <div className="p-6" dir="rtl">
      {/* <h2 className="text-2xl font-bold mb-6">{title}</h2> */}
      <div className="max-w-5xl mx-auto grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {data?.data?.result?.map((item) => {
              const name = mapItemToName
                ? mapItemToName(item)
                : (item as any).name;

              return (
                <div
                  key={item.id}
                  className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6
                    border border-brand-100 hover:border-brand-500 cursor-pointer group overflow-hidden
                    transform transition duration-300 hover:scale-[1.03] animate-fadeInUp min-h-[120px] min-w-[250px]"
                >
                  {/* Edit mode overlay */}
                  {editingId === item.id && !useEditModal ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-4 rounded-2xl z-20">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full text-sm dark:bg-gray-700"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          color="brand"
                          onClick={() => handleSubmitEdit()}
                          disabled={!editValue.trim()}
                        >
                          <Check size={16} className="ml-1" /> ذخیره
                        </Button>
                        <Button
                          size="sm"
                          color="error"
                          onClick={handleCancelEdit}
                        >
                          <X size={16} className="ml-1" /> لغو
                        </Button>
                      </div>
                    </div>
                  ) : renderCard ? (
                    renderCard(item)
                  ) : (
                    <></>
                  )}
                  <>
                    <div
                      className="absolute inset-0 flex flex-col items-end justify-end gap-1
                        bg-gray-200/60 dark:bg-gray-900/70 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 rounded-2xl p-2 z-10 "
                    >
                      <Button
                        size="icon"
                        variant="link"
                        color="brand"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditValue(name);
                          if (useEditModal) openModal();
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="link"
                        color="error"
                        onClick={() => {
                          setDeleteId(item.id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                </div>
              );
            })}

            {/* Add new item */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-1 border border-dashed border-brand-300 cursor-pointer flex items-center justify-center min-h-[120px] min-w-[250px] ">
              {adding && !useEditModal ? (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-3 rounded-2xl z-10">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder={`نام ${title}`}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      color="brand"
                      onClick={() => handleAdd()}
                      disabled={!newValue.trim()}
                    >
                      <Check size={16} className="ml-1" /> افزودن
                    </Button>
                    <Button
                      size="sm"
                      color="error"
                      onClick={() => {
                        setAdding(false);
                        setNewValue('');
                      }}
                    >
                      <X size={16} className="ml-1" /> لغو
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center ">
                  <Button
                    variant="ghost"
                    color="brand"
                    className="flex flex-col items-center gap-2"
                    onClick={() => {
                      setAdding(true);
                      if (useEditModal) openModal();
                    }}
                  >
                    <Plus size={24} />
                  </Button>
                  <Typography variant={'caption'} color="secondary" as="p">
                    {isPending ? 'در حال ارسال' : `افزودن ${title}`}
                  </Typography>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        loading={loadingDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        buttonType="yesNo"
        message="آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟"
        modalType="delete"
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          setEditingId(null); // Clear selectedId on close
        }}
        className="max-w-[700px] m-4"
        title={editingId ? 'ویرایش' : modalTitle}
      >
        {FormComponent && (
          <FormComponent
            closeModal={() => {
              closeModal();

              setEditingId(null);
            }}
            id={editingId ?? undefined}
            onSubmit={(values) =>
              editingId ? handleSubmitEdit(values) : handleAdd(values)
            }
          />
        )}
      </Modal>
    </div>
  );
}

const LoadingSkeleton = () => (
  <>
    {Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-sm p-6 min-h-[120px] min-w-[250px]"
      >
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    ))}
  </>
);
