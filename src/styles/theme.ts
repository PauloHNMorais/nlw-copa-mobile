import { extendTheme } from 'native-base';

const defaults = extendTheme({
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    14: 56,
  },
});

const light = extendTheme({
  ...defaults,
  colors: {
    gray: {
      950: '#09090A',
      900: '#121214',
      800: '#202024',
      600: '#323238',
      300: '#8D8D99',
      200: '#C4C4CC',
    },
    green: {
      500: '#047C3F',
    },
    yellow: {
      500: '#F7DD43',
      600: '#BBA317',
    },
    red: {
      500: '#DB4437',
    },
    black: '#000000',
    white: '#FFFFFF',
  },
});

const dark = extendTheme({
  ...defaults,
  colors: {
    gray: {
      200: '#09090A',
      300: '#121214',
      600: '#202024',
      800: '#323238',
      900: '#8D8D99',
      950: '#C4C4CC',
    },
    green: {
      500: '#047C3F',
    },
    yellow: {
      600: '#F7DD43',
      500: '#BBA317',
    },
    red: {
      500: '#DB4437',
    },
    black: '#FFFFFF',
    white: '#000000',
  },
});

export const THEME = { light, dark };
