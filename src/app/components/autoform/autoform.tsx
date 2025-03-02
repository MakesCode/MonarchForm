import React, { useState, useEffect, ReactNode } from 'react';
import { z } from 'zod';


type CompleteFormData = {
  form1?: Form1Data;
  form2?: Form2DataType;
  formCondition?: Form3Data;
};
export const Exemple2 = () => {
  const steps: StepConfig<Form1Data | Form2DataType | Form3Data, CompleteFormData>[] = [
    {
      name: 'form1',
      component: Form1,
      shouldRender: (formData) => {
        console.log('formData', formData);
        return true;
      },
    },
    {
      name: 'formCondition',
      component: Form3,
      shouldRender: (formData) => {
        console.log('formData', formData);
        return true;
      },
    },
    {
      name: 'form2',
      component: Form2,
      shouldRender: (formData) => {
        console.log('formData', formData);
        return formData['formCondition']?.periode === true;
      },
    },
  ];

  return (
    <MonarchForm
      steps={steps}
      nameStorage="myForm"
      onSubmitApi={(formData, clearFilters) => {
        console.log('onSubmitApi', formData);
        alert('Formulaire soumis avec succès !' + JSON.stringify(formData));
        clearFilters();
      }}
    >
      {({ currentForm, prevStep, progress, isLastStep, currentStepIndex, id }) => (
       <Card className='w-1/2 m-auto'>
        <CardHeader>
          {currentStepIndex}
          <p>Progression : {progress}%</p>
        </CardHeader>
        <CardContent>{currentForm}</CardContent>
        <CardFooter>
          {currentStepIndex > 0 && <Button onClick={prevStep}>Previous</Button>}
          <Button type="submit" form={id}>
            {isLastStep ? 'Soumettre' : 'Suivant'}
          </Button>
        </CardFooter>
     </Card>
      )}
    </MonarchForm>
  );
};

import { ZodProvider, fieldConfig } from '@autoform/zod';
import MonarchForm, { StepConfig, StepProps } from '../../MonarchForm';
import { AutoForm } from './autoform/AutoForm';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

export const phoneSchema = z.object({
  phoneOrigin: z.string({}).min(1),
  phoneCountryCode: z.string({}).min(1),
  phoneFormated: z.string({}).min(1),
  isValid: z.boolean().refine((value) => value === true, { message: 'Le numéro de téléphone est invalide' }),
});

const mySchema = z.object({
  firstname: z.string().superRefine(
    fieldConfig({
      label: 'Prénom',
      customData: { group: 'group1' },
      inputProps: {
        required: false,
      },
    }),
  ),
  lastname: z.string().superRefine(
    fieldConfig({
      label: 'Nom',
      customData: { group: 'group1' },
      inputProps: {
        required: false,
      },
    }),
  ),
  email: z.string().email().superRefine(
    fieldConfig({
      label: 'Email',
      inputProps: {
        required: false,
      },
    }),
  ),
  phone: phoneSchema.superRefine(
    fieldConfig({
      label: 'Numéro de téléphone',
      customData: { group: 'group2' },
      fieldType: 'phone',
      inputProps: {
        required: false,
      },
    }),
  ),
  type: z.enum(['particulier', 'professionnel']).superRefine(
    fieldConfig({
      label: 'Type',
      fieldType: 'select',
      inputProps: {
        required: false,
      },
      customData: {
        data: [
          { label: 'Particulier', value: 'particulier' },
          { label: 'Professionnel', value: 'professionnel' },
        ],
      },
    }),
  ),
});
const schemaProvider = new ZodProvider(mySchema);
export type Form1Data = z.infer<typeof mySchema>;
export const Form1 = ({ data, onDataChange, id }: StepProps<Form1Data>) => {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        onDataChange(data);
      }}
      defaultValues={data}
      id={id}
    />
  );
};

const mySchema2 = z.object({
  firstname: z.string().superRefine(
    fieldConfig({
      label: 'Prénom',
      customData: { group: 'group1' },
      inputProps: {
        required: false,
      },
    }),
  ),
});
const schemaProvider2 = new ZodProvider(mySchema2);
export type Form2DataType = z.infer<typeof mySchema2>;
export const Form2 = ({ data, onDataChange, id }: StepProps<Form2DataType>) => {
  return (
    <AutoForm
      schema={schemaProvider2}
      onSubmit={(data) => {
        console.log(data);
        onDataChange(data);
      }}
      defaultValues={data}
      id={id}
    />
  );
};
const mySchema3 = z.object({
  periode: z.boolean().superRefine(
    fieldConfig({
      label: "Période d'essai",
      fieldType: 'switch',
      customData: { group: 'group3' },
      inputProps: {
        required: false,
      },
    }),
  ),
});
const schemaProvider3 = new ZodProvider(mySchema3);
export type Form3Data = z.infer<typeof mySchema3>;
export const Form3 = ({ data, onDataChange, onTempChange, id }: StepProps<Form3Data>) => {
  return (
    <AutoForm
      schema={schemaProvider3}
      onSubmit={(data) => {
        console.log('Submitted data:', data);
        onDataChange(data);
      }}
      onFormInit={(form) => {
        form.watch((data) => {
          console.log('watch', data);
          onTempChange && onTempChange(data);
        });
      }}
      defaultValues={data}
      id={id}
    />
  );
};
