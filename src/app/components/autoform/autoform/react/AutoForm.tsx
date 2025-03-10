import React, { JSX, useEffect } from 'react';
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

  useEffect(() => {
    if (onFormInit) {
      onFormInit(methods);
    }
  }, [onFormInit, methods]);

  const handleSubmit = async (dataRaw: T) => {
    const data = removeEmptyValues(dataRaw);
    const validationResult = schema.validateSchema(data as T);
    console.log('validationResult', { validationResult, dataRaw, data });
    if (validationResult.success) {
      await onSubmit(validationResult.data, methods);
    } else {
      methods.clearErrors();
      validationResult.errors?.forEach((error) => {
        const path = error.path.join('.');
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
      });
    }
  };

  const renderFields = () => {
    const elements: JSX.Element[] = [];
    let currentGroup: string | null = null;
    let groupFields: ParsedField[] = [];

    const closeGroup = () => {
      if (groupFields.length > 0) {
        elements.push(
          <div key={`group-${currentGroup}`} className="flex gap-4 flex-col md:flex-row ">
            {groupFields.map((field) => (
              <AutoFormField key={field.key} field={field} path={[field.key]} />
            ))}
          </div>,
        );
        groupFields = [];
      }
    };

    parsedSchema.fields.forEach((field, index) => {
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
