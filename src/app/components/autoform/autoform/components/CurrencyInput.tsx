import * as React from 'react';
import { AutoFormFieldProps } from '../react/types';
import { Input } from '@/components/ui/input';

export const CurrencyInput: React.FC<AutoFormFieldProps> = (props) => {
  const valueNumericProp = props?.value as number | undefined;

  const [internalNumericValue, setInternalNumericValue] = React.useState(valueNumericProp);
  const [valueString, setValueString] = React.useState(() => {
    return valueNumericProp !== undefined && !Number.isNaN(valueNumericProp)
      ? valueNumericProp.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
      : '';
  });

  React.useEffect(() => {
    if (valueNumericProp !== internalNumericValue) {
      setInternalNumericValue(valueNumericProp);
      const newValue =
        valueNumericProp !== undefined && !Number.isNaN(valueNumericProp)
          ? valueNumericProp.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
          : '';
      setValueString(newValue);
    }
  }, [valueNumericProp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    inputValue = inputValue.replace(/[^\d,]/g, '');

    const parts = inputValue.split(',');
    if (parts.length > 2) {
      inputValue = parts[0] + ',' + parts.slice(1).join('');
    }

    setValueString(inputValue);

    const numericValue = inputValue ? parseFloat(inputValue.replace(',', '.')) : undefined;
    setInternalNumericValue(numericValue);

    const syntheticEvent = {
      target: {
        value: Number.isNaN(numericValue) ? undefined : numericValue,
        name: props.field.key,
      },
    };
    props.inputProps.onChange(syntheticEvent);
  };

  const handleBlur = () => {
    if (internalNumericValue !== undefined && !Number.isNaN(internalNumericValue)) {
      const hasComma = valueString.includes(',');
      const formattedValue = internalNumericValue.toLocaleString('fr-FR', {
        minimumFractionDigits: hasComma ? 2 : 0,
        maximumFractionDigits: 2,
      });
      setValueString(formattedValue);
    } else {
      setValueString('');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Input className="w-full" type="text" value={valueString} onChange={handleChange} onBlur={handleBlur} />
      <span className="text-gray-500">€</span>
    </div>
  );
};
