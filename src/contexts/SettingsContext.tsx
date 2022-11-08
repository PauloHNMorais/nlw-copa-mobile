import { createContext, ReactNode, useEffect } from 'react';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../translations/en.json';
import ptBR from '../translations/pt-br.json';
import { useColorScheme } from 'react-native';
import { useTheme } from 'native-base';

type Theme = 'light' | 'dark' | 'auto';

type Language = 'auto' | 'pt' | 'en';

export interface SettingsContextDataProps {
  theme: Theme;
  setTheme: Theme | ((value: Theme) => Promise<void>) | undefined;
  language: Language;
  setLanguage: Language | ((value: Language) => Promise<void>) | undefined;
  i18n: I18n;
}

const i18n = new I18n(
  {
    en,
    pt: ptBR,
    ptBR,
  },
  {
    defaultLocale: Localization.locale,
    enableFallback: true,
  }
);

export const SettingsContext = createContext({} as SettingsContextDataProps);

export const SettingsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguage] = useAsyncStorage<Language>(
    'settings/language',
    'auto'
  );

  const [theme, setTheme] = useAsyncStorage<Theme>('settings/theme', 'auto');

  useEffect(() => {
    switch (language) {
      case 'auto':
        i18n.translations = { [Localization.locale]: ptBR };
        i18n.locale = Localization.locale;
        break;
      case 'en':
        i18n.translations = { en };
        i18n.locale = 'en';
        break;
      case 'pt':
        i18n.translations = { pt: ptBR, ptBR };
        i18n.locale = 'pt';
        break;
    }
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{
        theme: theme as Theme,
        language: language as Language,
        setLanguage,
        setTheme,
        i18n,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
