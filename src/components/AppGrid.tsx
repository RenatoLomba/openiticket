import { FC } from 'react';
import { Grid } from '@chakra-ui/react';

export const AppGrid: FC = ({ children }) => {
  return (
    <Grid
      templateColumns="255px 1fr"
      templateRows="104px 1fr"
      templateAreas="
          'sidebar header'
          'sidebar content'
        "
      h="100vh"
    >
      {children}
    </Grid>
  );
};
