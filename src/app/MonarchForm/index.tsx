'use client';
import React, { useState, useEffect, ReactNode } from 'react';

export interface StepProps<T> {
  data: T;
  onDataChange: (data: T) => void;
  onTempChange?: (data: Partial<T>) => void;
  id: string;
}

export interface StepConfig<T, TFormData = Record<string, any>> {
  name: string;
  component: (props: StepProps<T>) => ReactNode;
  shouldRender?: (formData: TFormData) => boolean;
}

interface MonarchFormProps<T, TFormData = Record<string, any>> {
  steps: StepConfig<T, TFormData>[];
  onSubmitApi: (formData: TFormData, clearFilters: () => void) => void;
  nameStorage?: string;
  children: (props: {
    currentForm: ReactNode;
    prevStep: () => void;
    progress: number;
    isLastStep: boolean;
    currentStepIndex: number;
    id: string;
  }) => ReactNode;
}
const MonarchForm = <T, TFormData = Record<string, any>>({
  steps,
  onSubmitApi,
  nameStorage,
  children,
}: MonarchFormProps<T, TFormData>) => {
  const initialFormData = nameStorage && typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(nameStorage) || '{}') : {};

  const [formData, setFormData] = useState<Record<string, T>>(initialFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tempFormData, setTempFormData] = useState<T>(formData[steps[currentStepIndex]?.name] || ({} as T));

  useEffect(() => {
    if (nameStorage && typeof window !== 'undefined') {
      try {
        localStorage.setItem(nameStorage, JSON.stringify(formData));
      } catch (error) {
        console.error('Erreur localStorage :', error);
      }
    }
  }, [formData, nameStorage]);

  const getRenderedSteps = (data: Record<string, T>, tempData: T, currentStepName: string): StepConfig<T, TFormData>[] => {
    const combinedData: TFormData = { ...data, [currentStepName]: tempData } as TFormData;
    return steps.filter((step) => !step.shouldRender || step.shouldRender(combinedData));
  };

  const currentStepName = steps[currentStepIndex]?.name;
  const renderedSteps = getRenderedSteps(formData, tempFormData, currentStepName);
  const currentStep = renderedSteps[currentStepIndex];

  const nextStep = () => {
    if (currentStepIndex < renderedSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setTempFormData(formData[steps[currentStepIndex + 1]?.name] || ({} as T));
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setTempFormData(formData[steps[currentStepIndex - 1]?.name] || ({} as T));
    }
  };

  const handleSubmitStep = (stepName: string, data: T) => {
    const updatedFormData = { ...formData, [stepName]: data };
    setFormData(updatedFormData);
    setTempFormData(data);

    const newRenderedSteps = getRenderedSteps(updatedFormData, data, stepName);

    if (currentStepIndex >= newRenderedSteps.length) {
      setCurrentStepIndex(newRenderedSteps.length - 1);
    } else if (currentStepIndex < newRenderedSteps.length - 1) {
      nextStep();
    } else {
      submit(updatedFormData, newRenderedSteps);
    }
  };
  const clearFilters = () => {
    setFormData({});
    setTempFormData({} as T);
    setCurrentStepIndex(0);
    if (nameStorage && typeof window !== 'undefined') {
      localStorage.removeItem(nameStorage);
    }
  };
  const submit = (data: Record<string, T>, renderedStepsList: StepConfig<T, TFormData>[]) => {
    const filteredFormData = Object.fromEntries(
      Object.entries(data).filter(([key]) => renderedStepsList.some((step) => step.name === key)),
    );
    onSubmitApi(filteredFormData as TFormData, clearFilters);
  };

  const progress = renderedSteps.length > 1 ? (currentStepIndex / (renderedSteps.length - 1)) * 100 : 100;
  const isLastStep = currentStepIndex === renderedSteps.length - 1;

  const currentForm = currentStep ? (
    <currentStep.component
      data={tempFormData}
      onDataChange={(data) => handleSubmitStep(currentStep.name, data)}
      onTempChange={(partialData) => {
        setTempFormData({ ...tempFormData, ...partialData } as T);
      }}
      id={currentStep.name}
    />
  ) : null;

  return children({
    currentForm,
    prevStep,
    progress,
    isLastStep,
    currentStepIndex,
    id: currentStep?.name || '',
  });
};

export default MonarchForm;