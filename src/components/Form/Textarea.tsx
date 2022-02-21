import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

import { Label } from './Label';

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <Label label={label} name={name} />}

      <ChakraTextarea
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

const Textarea = forwardRef(TextareaBase);

export { Textarea };
