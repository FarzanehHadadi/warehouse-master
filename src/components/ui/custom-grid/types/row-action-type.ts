export type RowAction = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  callback: (row: any, index?: number) => void;
};
