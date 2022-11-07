import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme';
import { useColorScheme } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_100Thin_Italic,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_500Medium_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import * as Localization from 'expo-localization';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SettingsContextProvider } from './src/contexts/SettingsContext';
import { useSettings } from './src/hooks/useSettings';
require('dayjs/locale/pt-br');
dayjs.locale(Localization.locale);
dayjs.extend(localizedFormat);

function App() {
  const colorScheme = useColorScheme() || 'light';
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
    Roboto_700Bold_Italic,
    Roboto_900Black_Italic,
  });
  const { language, setLanguage, setTheme, theme } = useSettings();

  return (
    <NativeBaseProvider
      key={language}
      theme={theme === 'auto' ? THEME[colorScheme] : THEME[theme]}
    >
      <AuthContextProvider>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

export default function RootApp() {
  return (
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  );
}
