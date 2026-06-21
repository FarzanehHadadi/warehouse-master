type FilterConfig = {
  name: string;
  type: 'input' | 'select' | 'date-range';
  options?: { value: string | number; label: string }[]; // for select
  from?: string;
  to?: string;
};
