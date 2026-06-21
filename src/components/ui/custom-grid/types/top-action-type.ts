export type TopAction = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  callback: (filters?: any) => void;
  buttonVariant?: 'primary' | 'outline' | 'secondary' | 'ghost' | 'link';
};
