import { buildZodFieldConfig } from './react/utils';
import { FieldTypes } from './AutoForm';

export const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    // Add types for `customData` here.
    group?: string;
  }
>();
