## API Reference

### `ShadowStep` Props

| Prop          | Type                                                                 | Description                                                                  |
|---------------|----------------------------------------------------------------------|------------------------------------------------------------------------------|
| `steps`       | `StepConfig[]`                                                       | Array of step configurations (name, component, optional `shouldRender`).     |
| `onSubmitApi` | `(formData: TFormData, clearFilters: () => void) => void`            | Callback when the final step is submitted.                                   |
| `nameStorage` | `string` (optional)                                                  | Key for persisting form data in localStorage. If not specified, there’s no persistence of data in localStorage.                                |
| `children`    | `(props: { currentForm, prevStep, progress, isLastStep, currentStepIndex, id }) => ReactNode` | Render prop for custom UI.                        |

### `StepConfig`

| Property       | Type                               | Description                                              |
|----------------|------------------------------------|----------------------------------------------------------|
| `name`         | `string`                          | Unique identifier for the step.                          |
| `component`    | `(props: StepProps<T>) => ReactNode` | Component rendered for this step.                     |
| `shouldRender` | `(formData: TFormData) => boolean` (optional) | Condition to show/hide the step based on form data. |

### `StepProps<T>`

| Property       | Type                               | Description                                              |
|----------------|------------------------------------|----------------------------------------------------------|
| `data`         | `T`                               | Current data for this step, passed to the component.     |
| `onDataChange` | `(data: T) => void`               | Callback to update the step’s data when submitted.       |
| `onTempChange` | `(data: Partial<T>) => void` (optional) | Callback to handle temporary data changes during input. This is used to recalculate `progress` and `isLastStep` in real-time as the user interacts with the form.|
| `id`           | `string`                          | This is used to link the step to its form, ensuring the submit button is properly connected to it.  |

# Usage Example

Check out the full example in `Exemple2.tsx` (./src/Exemple2.tsx) for a working demo with conditional steps and Zod validation.

# License

This project is licensed under the MIT License (./LICENSE).