import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

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
