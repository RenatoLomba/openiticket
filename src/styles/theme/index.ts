import { extendTheme } from '@chakra-ui/react';

import { globalStyles as styles } from './global';
import { colors } from './colors';
import { fonts } from './fonts';

const theme = extendTheme({
  colors,
  styles,
  fonts,
});

export { theme };
