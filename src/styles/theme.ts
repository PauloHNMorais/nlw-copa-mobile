import { extendTheme, theme } from 'native-base';
import { invertColor } from '../utils/color';

const defaults = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto_100Thin',
        italic: 'Roboto_100Thin_Italic',
      },
      200: {
        normal: 'Roboto_300Light',
        italic: 'Roboto_300Light_Italic',
      },
      300: {
        normal: 'Roboto_300Light',
        italic: 'Roboto_300Light_Italic',
      },
      400: {
        normal: 'Roboto_400Regular',
        italic: 'Roboto_400Regular_Italic',
      },
      500: {
        normal: 'Roboto_500Medium',
        italic: 'Roboto_500Medium_Italic',
      },
      600: {
        normal: 'Roboto_500Medium',
        italic: 'Roboto_500Medium_Italic',
      },
      700: {
        normal: 'Roboto_700Bold',
        italic: 'Roboto_700Bold_Italic',
      },
      800: {
        normal: 'Roboto_700Bold',
        italic: 'Roboto_700Bold_Italic',
      },
      900: {
        normal: 'Roboto_900Black',
        italic: 'Roboto_900Black_Italic',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    medium: 'Roboto',
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
  isDark: false,
});

const dark = extendTheme({
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
    black: '#FFFFFF',
    white: '#000000',
    card: '#202024',
    bg: '#09090A',
  },
  isDark: true,
});

const light = extendTheme({
  ...defaults,
  colors: {
    gray: {
      950: '#f6f6f5',
      900: '#ededeb',
      800: '#dfdfdb',
      700: invertColor(theme.colors.gray[700]),
      600: '#cdcdc7',
      500: invertColor(theme.colors.gray[500]),
      400: invertColor(theme.colors.gray[400]),
      300: '#727266',
      200: '#3b3b33',
      100: invertColor(theme.colors.gray[100]),
    },
    green: {
      500: '#047C3F',
    },
    yellow: {
      500: '#BBA317',
      600: '#F7DD43',
    },
    red: {
      500: '#DB4437',
    },
    black: '#000000',
    white: '#FFFFFF',
    card: '#ededeb',
    bg: '#dfdfdb',
  },
});

export const THEME = { light, dark };
