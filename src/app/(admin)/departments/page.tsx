'use client';
import { DEPARTMENTS } from '@/constants/urls';
import Grid from '../../../components/ui/custom-grid/custom-grid';
import { Building } from 'lucide-react';

export default function Page() {
  return (
    <Grid
      TitleIcon={Building}
      endpoint={DEPARTMENTS}
      deleteEndpoint={DEPARTMENTS}
      filters={[
        {
          name: 'name',
          type: 'input',
        },
      ]}
      title="دپارتمان ها"
      Form={() => <></>}
      columns={[
        { key: 'name', label: 'نام' },
        { key: 'manager_name', label: 'مدیر' },
      ]}
      pageSize={20}
      addButtonText="افزودن دپارتمان"
      modalTitle=""
    />
  );
}
