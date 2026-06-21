// 'use client';
// import { UNITS } from '@/constants/urls';
// import Grid from '../../../components/ui/custom-grid/custom-grid';
// import { Ruler } from 'lucide-react';

// export default function Page() {
//   return (
//     <Grid
//       TitleIcon={Ruler}
//       endpoint={UNITS}
//       deleteEndpoint={UNITS}
//       filters={[
//         {
//           name: 'name',
//           type: 'input',
//         },
//       ]}
//       title="واحدها"
//       Form={() => <></>}
//       columns={[{ key: 'name', label: 'نام' }]}
//       pageSize={20}
//       addButtonText="افزودن واحد"
//       modalTitle=""
//     />
//   );
// }
'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button/Button';
import Typography from '@/components/ui/typography/Typography';
import { UNITS, UNIT } from '@/constants/urls';
import { useEnhancedQuery } from '@/hooks/use-enhanced-query';
import { Edit, Trash2, Check, X, Plus } from 'lucide-react';
import Input from '@/components/form/input/InputField';
import ModalConfirmation from '@/components/form/form-elements/ModalConfirmation';
import { useEnhancedMutation } from '@/hooks/use-enhanced-mutation';
import { ConfirmationModal } from '@/components/ui/confirmation-modal/ConfirmationModal';

type SimpleObject = { name: string; id: number };

export default function UnitGrid() {
  const { data: units, isLoading } = useEnhancedQuery<{
    result: SimpleObject[];
  }>({
    url: UNITS,
    method: 'GET',
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);
  const [newUnit, setNewUnit] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const { mutateAsync, isPending } = useEnhancedMutation({
    method: editingId ? 'PATCH' : 'POST',
    url: editingId ? `${UNIT}/${editingId}/` : UNIT,
    invalidateQueries: [UNITS, editingId ? editingId?.toString() : ''],
  });

  const { mutateAsync: deleteUnit, isPending: loadingDelete } =
    useEnhancedMutation({
      method: 'DELETE',
      url: UNIT,
      mode: 'path',
      invalidateQueries: [UNITS, deleteId?.toString() ?? ''],
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      },
    });

  const handleSubmit = (id: number) => {
    mutateAsync({ name: editValue });
    setEditingId(null);
  };

  const handleAdd = () => {
    mutateAsync({ name: newUnit }).then(() => {
      setAdding(false);
      setNewUnit('');
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteUnit(deleteId);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">واحد ها</h2>
      <div className="max-w-4xl mx-auto grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          units?.data?.result?.map(({ name, id }) => (
            <div
              key={id}
              className="
                relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 
                border border-brand-100 hover:border-brand-500 cursor-pointer group overflow-hidden
                transform transition duration-300 hover:scale-[1.03] 
                animate-fadeInUp min-h-[100px]
              "
            >
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

                  <div
                    className="
                      absolute inset-0 flex flex-col items-end justify-end gap-1 
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
          ))
        )}

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
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="نام واحد"
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    color="brand"
                    onClick={handleAdd}
                    disabled={!newUnit.trim()}
                  >
                    <Check size={16} className="mr-1" /> افزودن
                  </Button>
                  <Button
                    size="sm"
                    color="error"
                    onClick={() => {
                      setAdding(false);
                      setNewUnit('');
                    }}
                  >
                    <X size={16} className="mr-1" /> لغو
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <Button
                  variant="link"
                  color="brand"
                  onClick={() => setAdding(true)}
                  className="flex flex-col items-center gap-2"
                >
                  <Plus size={24} />
                </Button>
                <Typography variant={'caption'} color="secondary" as="p">
                  افزودن واحد
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
