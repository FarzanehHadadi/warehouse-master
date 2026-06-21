'use client';

import React from 'react';
import { Controller, Control, RegisterOptions } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';
import { CalendarIcon } from 'lucide-react';

interface PersianDatePickerProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  error?: boolean;
  hint?: string;
  rules?: RegisterOptions;
}

const PersianDatePicker: React.FC<PersianDatePickerProps> = ({
  name,
  control,
  placeholder = 'انتخاب تاریخ',
  className = '',
  error = false,
  hint,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange } }) => {
        const handleChange = (date: any) => {
          if (!date) {
            onChange('');
            return;
          }

          // Convert to Gregorian date string (YYYY-MM-DD)
          const gregorianDate = date
            .convert(gregorian, gregorian_en)
            .format('YYYY-MM-DD');

          onChange(gregorianDate);
        };

        // Convert the stored Gregorian date back to a format the Persian DatePicker can understand
        const getDatePickerValue = () => {
          if (!value) return undefined;

          try {
            // If value is already a Date object, use it directly
            if (value instanceof Date) {
              return value;
            }

            // If value is a string in YYYY-MM-DD format, parse it
            if (
              typeof value === 'string' &&
              value.match(/^\d{4}-\d{2}-\d{2}$/)
            ) {
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

        return (
          <div className="relative w-full">
            <DatePicker
              value={getDatePickerValue()}
              onChange={handleChange}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              placeholder={placeholder}
              inputClass={`h-9 w-full rounded-lg border px-4 py-1.5 pl-11 text-sm shadow-theme-xs
                placeholder:text-gray-400 focus:outline-hidden focus:ring-3
                dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                ${
                  error
                    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10'
                    : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
                }
                ${
                  value
                    ? 'text-gray-800 dark:text-white/90'
                    : 'text-gray-400 dark:text-gray-400'
                }
                ${className}
              `}
            />

            {/* Calendar Icon */}
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-600" />

            {/* Hint / Error text */}
            {hint && (
              <p
                className={`absolute -bottom-5 text-xs ${
                  error ? 'text-error-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {hint}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default PersianDatePicker;
