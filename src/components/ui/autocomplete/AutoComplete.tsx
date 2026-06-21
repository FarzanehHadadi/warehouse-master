// import { cn } from '@/lib/utils';
// import { Command as CommandPrimitive } from 'cmdk';
// import { Check } from 'lucide-react';
// import { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '../command/Command';
// // import { Input } from '../input';
// import { Popover, PopoverAnchor, PopoverContent } from '../popover/Popover';
// import { Skeleton } from '../skeleton/Skeleton';
// import Input from '@/components/form/input/InputField';

// export type Option = Record<'value' | 'label', string> & Record<string, string>;

// type AutoCompleteProps = {
//   options: Option[];
//   emptyMessage: string;
//   value?: Option;
//   onValueChange?: (value: Option) => void;
//   isLoading?: boolean;
//   disabled?: boolean;
//   placeholder?: string;
// };

// export const AutoComplete = ({
//   options,
//   placeholder,
//   emptyMessage,
//   value,
//   onValueChange,
//   disabled,
//   isLoading = false,
// }: AutoCompleteProps) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [isOpen, setOpen] = useState(false);
//   const [selected, setSelected] = useState<Option>(value as Option);
//   const [inputValue, setInputValue] = useState<string>(value?.label || '');

//   const handleKeyDown = useCallback(
//     (event: KeyboardEvent<HTMLDivElement>) => {
//       const input = inputRef.current;
//       if (!input) {
//         return;
//       }

//       // Keep the options displayed when the user is typing
//       if (!isOpen) {
//         setOpen(true);
//       }

//       // This is not a default behaviour of the <input /> field
//       if (event.key === 'Enter' && input.value !== '') {
//         const optionToSelect = options.find(
//           (option) => option.label === input.value
//         );
//         if (optionToSelect) {
//           setSelected(optionToSelect);
//           onValueChange?.(optionToSelect);
//         }
//       }

//       if (event.key === 'Escape') {
//         input.blur();
//       }
//     },
//     [isOpen, options, onValueChange]
//   );

//   const handleBlur = useCallback(() => {
//     setOpen(false);
//     setInputValue(selected?.label);
//   }, [selected]);

//   const handleSelectOption = useCallback(
//     (selectedOption: Option) => {
//       setInputValue(selectedOption.label);

//       setSelected(selectedOption);
//       onValueChange?.(selectedOption);

//       // This is a hack to prevent the input from being focused after the user selects an option
//       // We can call this hack: "The next tick"
//       setTimeout(() => {
//         inputRef?.current?.blur();
//       }, 0);
//     },
//     [onValueChange]
//   );

//   return (
//     <CommandPrimitive onKeyDown={handleKeyDown}>
//       <div>
//         <CommandInput
//           ref={inputRef}
//           value={inputValue}
//           onValueChange={isLoading ? undefined : setInputValue}
//           onBlur={handleBlur}
//           onFocus={() => setOpen(true)}
//           placeholder={placeholder}
//           disabled={disabled}
//           className="text-base"
//         />
//       </div>
//       <div className="relative mt-1">
//         <div
//           className={cn(
//             'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none',
//             isOpen ? 'block' : 'hidden'
//           )}
//         >
//           <CommandList className="rounded-lg ring-1 ring-slate-200">
//             {isLoading ? (
//               <CommandPrimitive.Loading>
//                 <div className="p-1">
//                   <Skeleton className="h-8 w-full" />
//                 </div>
//               </CommandPrimitive.Loading>
//             ) : null}
//             {options.length > 0 && !isLoading ? (
//               <CommandGroup>
//                 {options.map((option) => {
//                   const isSelected = selected?.value === option.value;
//                   return (
//                     <CommandItem
//                       key={option.value}
//                       value={option.label}
//                       onMouseDown={(event) => {
//                         event.preventDefault();
//                         event.stopPropagation();
//                       }}
//                       onSelect={() => handleSelectOption(option)}
//                       className={cn(
//                         'flex w-full items-center gap-2',
//                         !isSelected ? 'pl-8' : null
//                       )}
//                     >
//                       {isSelected ? <Check className="w-4" /> : null}
//                       {option.label}
//                     </CommandItem>
//                   );
//                 })}
//               </CommandGroup>
//             ) : null}
//             {!isLoading ? (
//               <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
//                 {emptyMessage}
//               </CommandPrimitive.Empty>
//             ) : null}
//           </CommandList>
//         </div>
//       </div>
//     </CommandPrimitive>
//   );
// };
import { cn } from '@/lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';
import { KeyboardEvent, useCallback, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../command/Command';
import { Skeleton } from '../skeleton/Skeleton';
import Input from '@/components/form/input/InputField';
import Typography from '../typography/Typography';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  value?: Option;
  onValueChange?: (value: Option) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  hint?: string;
  onSearch?: (value: string) => void;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  disabled,
  isLoading = false,
  error,
  success,
  hint,
  onSearch,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || '');

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) return;

      if (!isOpen) setOpen(true);

      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);
      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        {/* Replace CommandInput with your Input component */}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            if (!isLoading) {
              setInputValue(e.target.value);
            }
            onSearch?.(e.target.value);
          }}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          success={success}
          hint={hint}
          className="text-base"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            'animate-in fade-in-0 zoom-in-95 border absolute top-0 z-10 w-full rounded-xl bg-white dark:bg-gray-600 outline-none',
            isOpen ? 'block' : 'hidden',
            error
              ? 'border-error-500 focus:border-error-500 focus:ring-error-500/10'
              : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10'
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200dark:ring-slate-800 ">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1 ">
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        'flex w-full items-center gap-2 cursor-pointer rounded-md px-2 py-1.5',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        isSelected
                          ? 'bg-brand-50 dark:bg-brand-800 font-medium'
                          : 'pl-8'
                      )}
                    >
                      {isSelected ? (
                        <Check
                          className={cn(
                            'w-4',
                            isSelected
                              ? 'text-brand-600 dark:text-brand-200'
                              : ''
                          )}
                        />
                      ) : null}
                      <Typography variant={'body2'}>{option.label}</Typography>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
