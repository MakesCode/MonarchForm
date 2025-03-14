import React from 'react';
import { FieldWrapperProps } from '../react/types';
import { Label } from '@/components/ui/label';

const DISABLED_LABELS = ['boolean', 'object', 'array'];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, children, id, field, error }) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <div className="space-y-2 grow flex flex-col relative">
      {!isDisabled && (
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {children}
      {field.fieldConfig?.description && <p className="text-sm text-muted-foreground">{field.fieldConfig.description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
