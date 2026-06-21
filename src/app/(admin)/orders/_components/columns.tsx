import {
  AlertCircle,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Building,
  CircleCheckBig,
  HelpCircle,
  Store,
} from 'lucide-react';
import Badge from '@/components/ui/badge/Badge';
import Typography from '@/components/ui/typography/Typography';

export const columns = [
  {
    key: 'product_id',
    label: 'کالا',
    render: (row) => <>{row.product.name}</>,
  },
  {
    key: 'department.name',
    label: 'دپارتمان',
    render: (row) => (
      <Typography variant={'body2'} className="flex items-center gap-2">
        <Building className="size-5" />
        {row.department.name}
      </Typography>
    ),
  },
  { key: 'quantity', label: 'تعداد' },
  {
    key: 'store_id',
    label: 'انبار',
    render: (row) => (
      <Typography variant={'body2'} className="flex items-center gap-2">
        <Store className="size-5" />
        {row.store.name}
      </Typography>
    ),
  },
  {
    key: 'type',
    label: 'نوع',
    render: (row) => (
      <Badge
        color={
          row.type === 'inbound'
            ? 'success'
            : row.type === 'outbound'
            ? 'error'
            : 'primary'
        }
      >
        <div className="flex gap-1 items-center">
          {row.type === 'inbound' ? (
            <>
              <ArrowLeftFromLine className="size-3.5" />
              ورودی
            </>
          ) : row.type === 'outbound' ? (
            <>
              <ArrowRightFromLine className="size-3.5" />
              خروجی
            </>
          ) : (
            ''
          )}
        </div>
      </Badge>
    ),
  },
  {
    key: 'expire_date',
    label: 'تاریخ',
    render: (row) => (
      <>
        {row.expire_date
          ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(row.expire_date))
          : ''}
      </>
    ),
  },
  {
    key: 'product_status',
    label: 'وضعیت',
    render: (row) => (
      <>
        <div className="flex gap-2 items-center">
          {row.product_status === 'good' ? (
            <>
              <CircleCheckBig className="text-success-600 dark:text-success-200 size-3.5" />
              <Typography
                variant={'caption'}
                className="text-success-600 dark:text-success-200"
              >
                سالم
              </Typography>
            </>
          ) : row.product_status === 'defective' ? (
            <>
              <AlertCircle className="text-error-600 dark:text-error-200 size-3.5" />
              <Typography
                variant={'caption'}
                className="text-error-600 dark:text-error-200"
              >
                معیوب
              </Typography>
            </>
          ) : (
            <>
              <HelpCircle className="text-warning-600 dark:text-warning-200 size-3.5" />
              <Typography
                variant={'caption'}
                className="text-warning-600 dark:text-warning-200"
              >
                نامشخص
              </Typography>
            </>
          )}
        </div>
      </>
    ),
  },
];
