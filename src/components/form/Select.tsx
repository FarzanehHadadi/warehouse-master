import React from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  className?: string;
  error?: boolean; // new
  hint?: string; // new
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select an option',
      className = '',
      error,
      hint,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          {...props}
          className={`h-9 w-full appearance-none rounded-lg border px-4 py-1.5 pl-11 text-sm
            shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3
            dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
            ${
              error
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10'
                : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
            }
            ${className}
            ${
              props.value
                ? 'text-gray-800 dark:text-white/90'
                : 'text-gray-400 dark:text-gray-400'
            }
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              className="text-gray-800 dark:text-gray-100"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Icon inside the select */}
        <ChevronDownIcon className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-600" />

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
  }
);

Select.displayName = 'Select';

export default Select;
