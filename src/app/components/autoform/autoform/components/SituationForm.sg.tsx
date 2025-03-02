import React from 'react';
import { AutoFormFieldProps } from '../react';
import { BriefcaseBusiness } from 'lucide-react';
import { clsx } from 'clsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

export const SituationForm: React.FC<AutoFormFieldProps> = (props) => {
  const isMobile = useIsMobile();
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const options = props?.field.fieldConfig?.customData?.data as { label: string; value: string }[];
  const handleButtonClick = (value: string) => {
    setSelectedValue(value);
    const syntheticEvent = {
      target: {
        value,
        name: props.field.key,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    props.inputProps.onChange(syntheticEvent);
  };
  if (isMobile) {
    return (
      <Select onValueChange={handleButtonClick} value={selectedValue ?? ''}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }
  return (
    <div className="flex gap-4 flex-wrap group">
      {options?.map((option) => {
        return (
          <Button
            variant="outline"
            className={clsx('w-full max-w-[200px] justify-start py-6', 'truncate group-hover:text-clip', {
              'ring-3 outline-1': selectedValue === option.value,
            })}
            onClick={() => handleButtonClick(option.value)}
            type="button"
            key={option.value}
          >
            <BriefcaseBusiness />
            <span className="truncate">{option.label}</span>
          </Button>
        );
      })}
    </div>
  );
};
