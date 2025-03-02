import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { AutoFormFieldProps } from '../react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export const DatePicker: React.FC<AutoFormFieldProps> = (props) => {
  const [date, setDate] = React.useState<Date>();
  const handleSelect = (value: Date | undefined): any => {
    setDate(value);
    const syntheticEvent = {
      target: {
        value: value?.toISOString(),
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};
