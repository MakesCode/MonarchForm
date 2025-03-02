import React from 'react';
import { AutoForm as BaseAutoForm } from './react/AutoForm';
import { AutoFormProps } from './types';
import { Form } from '../autoform/components/Form';
import { FieldWrapper } from '../autoform/components/FieldWrapper';
import { ErrorMessage } from '../autoform/components/ErrorMessage';
import { SubmitButton } from '../autoform/components/SubmitButton';
import { StringField } from '../autoform/components/StringField';
import { NumberField } from '../autoform/components/NumberField';
import { BooleanField } from '../autoform/components/BooleanField';
import { DateField } from '../autoform/components/DateField';
import { SelectField } from '../autoform/components/SelectField';
import { ObjectWrapper } from '../autoform/components/ObjectWrapper';
import { ArrayWrapper } from '../autoform/components/ArrayWrapper';
import { ArrayElementWrapper } from '../autoform/components/ArrayElementWrapper';
import { AutoFormUIComponents } from './react/types';
import { SituationForm } from './components/SituationForm.sg';
import { DatePicker } from './components/DatePicker';
import { Switch } from './components/Switch';
import { CurrencyInput } from './components/CurrencyInput';
import { PhoneComponent } from './components/PhoneComponent';

const ShadcnUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const ShadcnAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
  situation: SituationForm,
  datepicker: DatePicker,
  switch: Switch,
  currency: CurrencyInput,
  phone: PhoneComponent,
} as const;
export type FieldTypes = keyof typeof ShadcnAutoFormFieldComponents;

export function AutoForm<T extends Record<string, any>>({ uiComponents, formComponents, ...props }: AutoFormProps<T>) {
  return (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...ShadcnUIComponents, ...uiComponents }}
      formComponents={{ ...ShadcnAutoFormFieldComponents, ...formComponents }}
    />
  );
}
