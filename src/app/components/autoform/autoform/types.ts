import { ExtendableAutoFormProps } from './react/types';
import { FieldValues } from 'react-hook-form';

export interface AutoFormProps<T extends FieldValues> extends ExtendableAutoFormProps<T> {
  id: string;
}
