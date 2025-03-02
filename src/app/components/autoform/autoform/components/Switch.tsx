import * as React from 'react';
import { Switch as SwitchShadcn } from '@/components/ui/switch';
import { AutoFormFieldProps } from '../react/types';

export const Switch: React.FC<AutoFormFieldProps> = (props) => {
  const [value, setCheck] = React.useState<boolean>(props?.value ?? false);
  const handleCheckedChange = (checked: boolean): any => {
    setCheck(() => checked);
    const syntheticEvent = {
      target: {
        value: checked,
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
  };
  React.useEffect(() => {
    const syntheticEvent = {
      target: {
        value: value,
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
  }, []);
  return <SwitchShadcn id={props.id} onCheckedChange={handleCheckedChange} checked={value} />;
};
