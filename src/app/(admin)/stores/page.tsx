'use client';
import { STORES } from '@/constants/urls';
import Grid from '../../../components/ui/custom-grid/custom-grid';
import { Store } from 'lucide-react';

export default function Page() {
  return (
    <Grid
      TitleIcon={Store}
      endpoint={STORES}
      deleteEndpoint={STORES}
      filters={[
        {
          name: 'name',
          type: 'input',
        },
      ]}
      title="انبارها"
      Form={() => <></>}
      columns={[
        { key: 'name', label: 'نام' },
        { key: 'manager_name', label: 'مدیر' },
        {
          key: 'is_active',
          label: 'وضعیت',
          render: (row) => (row.is_active ? 'فعال' : 'غیرفعال'),
        },
      ]}
      pageSize={20}
      addButtonText="افزودن انبار"
      modalTitle=""
    />
  );
}
