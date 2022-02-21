import { FC } from 'react';
import { FormLabel, FormLabelProps } from '@chakra-ui/react';

interface LabelProps extends FormLabelProps {
  name: string;
  label?: string;
}

export const Label: FC<LabelProps> = ({ label, name, ...props }) => {
  return (
    <FormLabel
      htmlFor={name}
      fontWeight="bold"
      fontSize="xs"
      color="grayscale.gray"
      {...props}
    >
      {label?.toUpperCase()}
    </FormLabel>
  );
};
