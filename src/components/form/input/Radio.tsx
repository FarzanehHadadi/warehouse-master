'use client';

import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];
  className?: string;
  error?: boolean;
  hint?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  control,
  options,
  className = '',
  error = false,
  hint,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className={`flex gap-4 flex-wrap ${className}`}>
          {options.map((option) => {
            const checked = value === option.value;
            return (
              <label
                key={option.value}
                className={`relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium ${
                  option.disabled
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-400'
                }`}
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={checked}
                  onChange={() => !option.disabled && onChange(option.value)}
                  className="sr-only"
                  disabled={option.disabled}
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
                    checked
                      ? 'border-brand-500 bg-brand-500'
                      : 'bg-transparent border-gray-300 dark:border-gray-700'
                  } ${
                    option.disabled
                      ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                      : ''
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full bg-white ${
                      checked ? 'block' : 'hidden'
                    }`}
                  />
                </span>
                {option.label}
              </label>
            );
          })}
          {hint && (
            <p
              className={`mt-1 text-xs ${
                error ? 'text-error-500' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {hint}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RadioGroup;
