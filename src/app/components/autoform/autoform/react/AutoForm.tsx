import React, { JSX, useEffect, useState } from 'react';
import { useForm, FormProvider, DefaultValues } from 'react-hook-form';
import { AutoFormProps } from './types';
import { AutoFormProvider } from './context';
import { AutoFormField } from './AutoFormField';
import { getDefaultValues, parseSchema, removeEmptyValues } from '../core/logic';
import { ParsedField } from '../core/types';

export function AutoForm<T extends Record<string, any>>({
  schema,
  onSubmit = () => {},
  defaultValues,
  values,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,
  onFormInit = () => {},
  formProps = {},
  id,
}: AutoFormProps<T>) {
  const parsedSchema = parseSchema(schema);
  const methods = useForm<T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
  });

  const formData = methods.getValues();

  useEffect(() => {
    if (onFormInit) {
      onFormInit(methods);
    }
      const interactiveField = parsedSchema.fields.find((field) => field.key === 'interactive');
      if (interactiveField && interactiveField.fieldConfig?.shouldRender) {
        const shouldRender = interactiveField.fieldConfig.shouldRender(formData);
        const currentValue = methods.getValues('interactive' as any);
        if (!shouldRender && currentValue !== undefined && currentValue !== '') {
          methods.setValue('interactive' as any, '' as any, { shouldValidate: false });
        }
      }
  }, [formData, methods, onFormInit, parsedSchema.fields]);

  function getFieldByPath(fields: ParsedField[], path: (string | number)[]): ParsedField | undefined {
    let current: ParsedField | undefined;
    for (const key of path) {
      if (!current) {
        current = fields.find(f => f.key === key);
      } else {
        current = current.schema?.find(f => f.key === key);
      }
      if (!current) {
        return undefined;
      }
    }
    return current;
  }

  const handleSubmit = async (dataRaw: T) => {
    const data = removeEmptyValues(dataRaw);
    const validationResult = schema.validateSchema(data as T);
    console.log('validationResult', { validationResult, dataRaw, data });
  
    if (validationResult.success) {
      await onSubmit(validationResult.data, methods);
    } else {
      methods.clearErrors();
      const formData = methods.getValues();
      validationResult.errors?.forEach((error) => {
        const path = error.path.join('.');
        const field = getFieldByPath(parsedSchema.fields, error.path);

        if (field && field.fieldConfig?.shouldRender?.(formData) !== false) {
          methods.setError(path as any, {
            type: 'custom',
            message: error.message,
          });
  
          const correctedPath = error.path?.slice?.(0, -1);
          if (correctedPath?.length > 0) {
            methods.setError(correctedPath.join('.') as any, {
              type: 'custom',
              message: error.message,
            });
          }
        }
      });
    }
  };
  

  const renderFields = () => {
    const elements: JSX.Element[] = [];
    let currentGroup: string | null = null;
    let groupFields: ParsedField[] = [];
  
    const formData = methods.watch();
  
    const closeGroup = () => {
      if (groupFields.length > 0) {
        elements.push(
          <div key={`group-${currentGroup}`} className="flex gap-4 flex-col md:flex-row">
            {groupFields.map((field) => (
              <AutoFormField key={field.key} field={field} path={[field.key]} />
            ))}
          </div>,
        );
        groupFields = [];
      }
    };
  
    parsedSchema.fields.forEach((field, index) => {
      const shouldRender = field.fieldConfig?.shouldRender?.(formData) ?? true;
      if (!shouldRender) {
        return;
      }
  
      const customData = field.fieldConfig?.customData?.group as string | undefined;
  
      if (customData) {
        if (currentGroup !== customData) {
          closeGroup();
          currentGroup = customData;
        }
        groupFields.push(field);
      } else {
        closeGroup();
        currentGroup = null;
        elements.push(
          <React.Fragment key={field.key}>
            <AutoFormField field={field} path={[field.key]} />
          </React.Fragment>,
        );
      }
  
      if (index === parsedSchema.fields.length - 1) {
        closeGroup();
      }
    });
  
    return elements;
  };
  return (
    <FormProvider {...methods}>
      <AutoFormProvider
        value={{
          schema: parsedSchema,
          uiComponents,
          formComponents,
        }}
      >
        <uiComponents.Form onSubmit={methods.handleSubmit(handleSubmit)} {...formProps} id={id}>
          {renderFields()}
          {withSubmit && <uiComponents.SubmitButton>Submit</uiComponents.SubmitButton>}
          {children}
        </uiComponents.Form>
      </AutoFormProvider>
    </FormProvider>
  );
}
