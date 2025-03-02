import { Input } from '@/components/ui/input';
import { AutoFormFieldProps } from '../react/types';
import React from 'react';

export const NumberField: React.FC<AutoFormFieldProps> = ({ inputProps, error, id }) => {
  const { key, ...props } = inputProps;

  return <Input id={id} type="number" className={error ? 'border-destructive' : ''} {...props} />;
};
