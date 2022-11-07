import { useContext } from 'react';
import {
  SettingsContext,
  SettingsContextDataProps,
} from '../contexts/SettingsContext';

export const useSettings = (): SettingsContextDataProps => {
  const context = useContext(SettingsContext);

  return context;
};
