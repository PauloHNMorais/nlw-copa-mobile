import 'react-native-gesture-handler';
import { NativeBaseProvider, StatusBar, ToastProvider } from 'native-base';
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
import * as NavigationBar from 'expo-navigation-bar';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { SettingsContextProvider } from './src/contexts/SettingsContext';
import { useSettings } from './src/hooks/useSettings';
import { ToastContextProvider } from './src/contexts/ToastContext';
import { useEffect } from 'react';
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

  useEffect(() => {
    const changeColor = async () => {
      if (theme === 'auto') {
        await NavigationBar.setBackgroundColorAsync(
          THEME[colorScheme].colors.card
        );
        await NavigationBar.setButtonStyleAsync(
          colorScheme === 'dark' ? 'light' : 'dark'
        );
      } else if (theme) {
        await NavigationBar.setBackgroundColorAsync(THEME[theme].colors.card);
        await NavigationBar.setButtonStyleAsync(
          theme === 'dark' ? 'light' : 'dark'
        );
      }
    };

    changeColor();
  }, [theme, colorScheme]);

  return (
    <NativeBaseProvider
      key={language}
      theme={theme === 'auto' ? THEME[colorScheme] : THEME[theme]}
    >
      <ToastContextProvider>
        <AuthContextProvider>
          <StatusBar
            barStyle={
              theme === 'auto'
                ? colorScheme === 'dark'
                  ? 'light-content'
                  : 'dark-content'
                : theme === 'dark'
                ? 'light-content'
                : 'dark-content'
            }
            backgroundColor='transparent'
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </ToastContextProvider>
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
