import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-v2/dropdown';
import { RowAction } from '../types/row-action-type';
import Button from '@/components/ui/button/Button';
import { MoreHorizontal } from 'lucide-react';
import Typography from '@/components/ui/typography/Typography';

function ActionCell({
  row,
  rowActions,
}: {
  row: any;
  rowActions: RowAction[];
}) {
  return (
    <div className="flex justify-center relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-28">
          {rowActions.map((action, index) => (
            <DropdownMenuItem key={index} onClick={() => action.callback(row)}>
              <action.icon className="mr-2 h-4 w-4 text-gray-800 dark:text-white/90" />
              <Typography variant={'caption'}>{action.title}</Typography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default ActionCell;
