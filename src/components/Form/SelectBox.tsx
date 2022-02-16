import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from '@chakra-ui/react';

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
      {!!label && (
        <FormLabel
          htmlFor={name}
          fontWeight="bold"
          fontSize="xs"
          color="grayscale.gray"
        >
          {label?.toUpperCase()}
        </FormLabel>
      )}

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
