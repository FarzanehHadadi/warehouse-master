import { useContext } from 'react';
import { FilterContext } from '../context/filter-context';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import Button from '../../button/Button';
import { X } from 'lucide-react';
function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.stopPropagation();
  }
}

function FilterRenderer({
  tabIndex,
  column,
  filterConfig,
}: {
  tabIndex?: number;
  column: { name: string; key: string };
  filterConfig: FilterConfig;
}) {
  const filters = useContext(FilterContext)!;
  const filterValue = filters[column.key];
  const filterEnabled = filters.enabled;

  const handleDateChange = (range: any) => {
    const [from, to] = range;
    if (!to) return;
    // Update 'from' field
    filters.onFilterChange(
      filterConfig.from,
      from ? from.convert(gregorian, gregorian_en).format('YYYY-MM-DD') : ''
    );

    // Update 'to' field
    filters.onFilterChange(
      filterConfig.to,
      to ? to.convert(gregorian, gregorian_en).format('YYYY-MM-DD') : ''
    );
  };

  return (
    <>
      <div>{column.name}</div>
      {filterEnabled && (
        <div>
          {filterConfig.type === 'input' && (
            <input
              className="border border-gray-700 dark:border-gray-100 bg-gray-100 dark:bg-gray-700 px-3 text-sm font-normal rounded-lg min-h-8 w-full"
              value={filterValue || ''}
              onChange={(e) =>
                filters.onFilterChange(column.key, e.target.value)
              }
              onKeyDown={inputStopPropagation}
            />
          )}
          {filterConfig.type === 'select' && (
            <select
              className="border border-gray-700 dark:border-gray-100 bg-gray-100 dark:bg-gray-700 px-3 text-sm font-normal rounded-lg min-h-8 w-full"
              value={filterValue || ''}
              onChange={(e) =>
                filters.onFilterChange(column.key, e.target.value)
              }
            >
              <option value="">همه</option>
              {filterConfig.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {filterConfig.type === 'date-range' && (
            <div className="relative">
              <DatePicker
                range
                calendar={persian}
                locale={persian_fa}
                dateSeparator=" تا "
                calendarPosition="top-right"
                value={[
                  //@ts-expect-error rwss
                  getDatePickerValue(filters[filterConfig?.from] || null),
                  //@ts-expect-error rwss
                  getDatePickerValue(filters[filterConfig?.to] || null),
                ]}
                onChange={handleDateChange}
                inputClass="h-8 w-full rounded-lg border px-3 py-1.5 text-sm 
              focus:outline-hidden focus:ring-3
             focus:border-brand-300 focus:ring-brand-500/10 border-gray-700 dark:border-gray-100 bg-gray-100 dark:bg-gray-700"
                placeholder="انتخاب بازه تاریخ"
                portal
              />
              <Button
                variant={'ghost'}
                className="absolute top-1.5 left-1 z-20 hover:bg-brand-100 dark:hover:bg-brand-600 dark:hover:text-gray-100"
                size={'icon'}
                color="brand"
                onClick={() => {
                  if (
                    //@ts-expect-error error
                    filters[filterConfig?.from] ||
                    //@ts-expect-error error
                    filters[filterConfig?.to]
                  ) {
                    filters.onFilterChange(filterConfig.from, '');
                    filters.onFilterChange(filterConfig.to, '');
                  }
                }}
              >
                <X />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FilterRenderer;
const getDatePickerValue = (value) => {
  if (!value) return undefined;

  try {
    // If value is already a Date object, use it directly
    if (value instanceof Date) {
      return value;
    }

    // If value is a string in YYYY-MM-DD format, parse it
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    }

    // Try to parse as a Date string
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  } catch {
    return undefined;
  }
};
