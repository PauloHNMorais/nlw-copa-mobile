import { useContext } from 'react';
import { ToastContext, ToastContextDataProps } from '../contexts/ToastContext';

export const useToast = (): ToastContextDataProps => {
  const context = useContext(ToastContext);

  return context;
};
