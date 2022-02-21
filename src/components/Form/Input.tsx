import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { forwardRef, ForwardRefRenderFunction } from 'react';

import { Label } from './Label';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, name, error, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label label={label} name={name} />}

      <ChakraInput
        id={name}
        name={name}
        ref={ref}
        _placeholder={{
          color: 'sidebar.gray',
          fontSize: 'sm',
        }}
        bg="grayscale.extraLight"
        borderColor="grayscale.border"
        color="grayscale.grayDark"
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

const Input = forwardRef(InputBase);

export { Input };
