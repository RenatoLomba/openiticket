import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  Select,
  SelectProps,
} from '@chakra-ui/react';

import { Label } from './Label';

interface SelectBoxOption {
  text: string | number;
  value: string | number;
}

interface SelectBoxProps extends SelectProps {
  options: SelectBoxOption[];
  name: string;
  label?: string;
  error?: FieldError;
}

const SelectBoxBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectBoxProps
> = ({ options, error, name, label, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label label={label} name={name} />}

      <Select
        id={name}
        name={name}
        ref={ref}
        bg="grayscale.extraLight"
        borderColor="grayscale.border"
        color="grayscale.grayDark"
        {...rest}
      >
        {options.map(({ text, value }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </Select>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

const SelectBox = forwardRef(SelectBoxBase);

export { SelectBox };
