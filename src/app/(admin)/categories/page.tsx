'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import Typography from '@/components/ui/typography/Typography';
import { CATEGORIES, CATEGORY } from '@/constants/urls';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import { Edit, Trash2, Check, X, Plus } from 'lucide-react';
import Input from '@/components/form/input/InputField';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { ConfirmationModal } from '@/components/ui/confirmation-modal/ConfirmationModal';

type SimpleObject = { name: string; id: number };
export default function CategoryGrid() {
  const { data: categories, isLoading } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: CATEGORIES,
    method: 'GET',
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const handleEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleSubmit = (id: number) => {
    console.log('Submit new name:', editValue, 'for id:', id);
    mutateAsync({ name: editValue });
    setEditingId(null);
  };
  const handleAdd = () => {
    console.log('Add new category:', newCategory);
    mutateAsync({ name: newCategory }).then(() => {
      setAdding(false);
      setNewCategory('');
    });
  };
  const { mutateAsync, isPending } = useEnhancedMutation({
    method: editingId ? 'PATCH' : 'POST',
    url: editingId ? `${CATEGORY}/${editingId}/` : CATEGORY,
    invalidateQueries: [CATEGORIES, editingId ? editingId?.toString() : ''],
  });
  const { mutateAsync: deleteCategory, isPending: loadingDelete } =
    useEnhancedMutation({
      method: 'DELETE',
      url: CATEGORY,
      mode: 'path',
      invalidateQueries: [CATEGORIES, deleteId?.toString() ?? ''],

      // mutationFn: (id: string) => axios.delete(`${deleteEndpoint}/${id}`),
      onSuccess: () => {
        // Invalidate query to refresh data
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      },
    });

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteCategory(deleteId);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6">دسته بندی ها</h2>
      <div className="max-w-4xl mx-auto grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          categories?.data?.result?.map(
            ({ name, id }: { name: string; id: number }) => (
              <div
                key={id}
                className="
              relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 
              border border-brand-100 hover:border-brand-500 cursor-pointer group overflow-hidden
              transform transition duration-300 hover:scale-[1.03] 
              animate-fadeInUp min-h-[100px]
            "
              >
                {/* If editing, show input */}
                {editingId === id ? (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-4">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border rounded-md px-2 py-1 w-full text-sm dark:bg-gray-700"
                    />
                    <ModalConfirmation
                      loading={isPending}
                      buttonSize="sm"
                      onCancel={handleCancel}
                      onConfirm={() => handleSubmit(id)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="group-hover:blur-[3px] transition duration-300">
                      <Typography variant={'body3'}>{name}</Typography>
                    </div>

                    {/* Hover Actions */}
                    <div
                      className="
                    absolute inset-0  flex flex-col items-end justify-end gap-1 
                    bg-gray-200/60 dark:bg-gray-900/70 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 rounded-2xl
                  "
                    >
                      <Button
                        size={'icon'}
                        variant={'link'}
                        color="brand"
                        className="mt-2"
                        onClick={() => handleEdit(id, name)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant={'link'}
                        size={'icon'}
                        color="error"
                        onClick={() => {
                          setDeleteId(id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )
          )
        )}
        {/* Add new category card */}
        {!isLoading && (
          <div
            className="
            relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-1 
            border border-dashed border-brand-300 cursor-pointer 
            flex items-center justify-center min-h-[100px]
          "
          >
            {adding ? (
              <div className="absolute rounded-3xl overflow-hidden inset-0 flex flex-col h-full justify-center items-center bg-white dark:bg-gray-800 p-3">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="نام دسته بندی"
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    color="brand"
                    onClick={handleAdd}
                    disabled={!newCategory.trim()}
                  >
                    <Check size={16} className="mr-1" /> افزودن
                  </Button>
                  <Button
                    size="sm"
                    color="error"
                    onClick={() => {
                      setAdding(false);
                      setNewCategory('');
                    }}
                  >
                    <X size={16} className="mr-1" /> لغو
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center ">
                <Button
                  variant="link"
                  color="brand"
                  onClick={() => setAdding(true)}
                  className="flex flex-col items-center gap-2"
                >
                  <Plus size={24} className="" />
                </Button>
                <Typography variant={'caption'} color="secondary" as="p">
                  {isPending ? 'در حال ارسال' : 'افزودن دسته بندی'}
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
      <ConfirmationModal
        loading={loadingDelete}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        buttonType="yesNo"
        message="آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟"
        modalType="delete"
      />
    </div>
  );
}
const LoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="
            animate-pulse bg-gray-200 dark:bg-gray-700 
            rounded-2xl shadow-sm p-6 min-h-[100px]
          "
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      ))}
    </>
  );
};
