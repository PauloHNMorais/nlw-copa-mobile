import { CheckIcon, FormControl, VStack } from 'native-base';
import { useState } from 'react';
import { Header } from '../components/Header';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';
import { Flag } from '../components/Flag';
import { Team } from '../components/Team';
import CountryFlag from 'react-native-country-flag';
import { Select, SelectItem } from '../components/Select';

type Theme = 'light' | 'dark' | 'auto';
type Language = 'auto' | 'pt' | 'en';

export function Settings() {
  const { language, setLanguage, setTheme, theme, i18n } = useSettings();

  return (
    <VStack flex={1} bgColor='bg'>
      <Header title={i18n.t('screens.settings.configuracoes')} />

      <VStack
        bgColor='card'
        my={6}
        mx={5}
        p={4}
        rounded='sm'
        borderBottomWidth={3}
        borderBottomColor='yellow.500'
        space={4}
      >
        <FormControl>
          <FormControl.Label>
            {i18n.t('screens.settings.tema')}
          </FormControl.Label>

          <Select
            minWidth='200'
            accessibilityLabel={i18n.t('screens.settings.tema')}
            placeholder={i18n.t('screens.settings.tema')}
            color='gray.200'
            selectedValue={theme}
            onValueChange={setTheme}
          >
            <SelectItem
              label={i18n.t('screens.settings.automatico')}
              value='auto'
            />
            <SelectItem
              label={i18n.t('screens.settings.claro')}
              value='light'
            />
            <SelectItem
              label={i18n.t('screens.settings.escuro')}
              value='dark'
            />
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label>
            {i18n.t('screens.settings.idioma')}
          </FormControl.Label>

          <Select
            minWidth='200'
            accessibilityLabel={i18n.t('screens.settings.idioma')}
            placeholder={i18n.t('screens.settings.idioma')}
            color='gray.200'
            selectedValue={language}
            onValueChange={setLanguage}
          >
            <SelectItem
              label={i18n.t('screens.settings.automatico')}
              value='auto'
            />
            <SelectItem
              label={i18n.t('screens.settings.pt')}
              value='pt'
              leftIcon={<CountryFlag isoCode='BR' size={16} />}
            />
            <SelectItem
              label={i18n.t('screens.settings.en')}
              value='en'
              leftIcon={<CountryFlag isoCode='US' size={16} />}
            />
          </Select>
        </FormControl>
      </VStack>
    </VStack>
  );
}
