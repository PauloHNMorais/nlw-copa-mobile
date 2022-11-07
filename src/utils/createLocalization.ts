import { I18nOptions } from './../../node_modules/i18n-js/typings/typing.d';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../translations/en.json';
import ptBR from '../translations/pt-br.json';

type LocalizationLanguage = 'en' | 'pt';

export function createLocalization(
  translations?: Record<LocalizationLanguage, Record<string, string>>,
  options?: Partial<I18nOptions> | undefined
) {
  const i18n = new I18n(
    {
      en,
      pt: ptBR,
      ptBR,
    },
    options
  );
  // i18n.locale = Localization.locale;
  i18n.locale = 'en';
  i18n.enableFallback = true;
  return i18n;
}
