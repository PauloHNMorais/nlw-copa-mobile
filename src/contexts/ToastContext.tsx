import { Alert, HStack, Slide, Text } from 'native-base';
import { createContext, ReactNode, useState } from 'react';
import { StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export interface ToastContextDataProps {
  info: (message: string, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  warn: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
}

export type ToastOptions = Partial<{
  interval: number;
  placement: 'top' | 'right' | 'bottom' | 'left';
}>;

const colorMap = {
  error: 'red.500',
  success: 'green.500',
  warning: 'yellow.700',
  info: 'blue.600',
};

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  interval: 3000,
  placement: 'top',
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const ToastContext = createContext({} as ToastContextDataProps);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | ReactNode>('');
  const [status, setStatus] = useState<
    'error' | 'success' | 'warning' | 'info'
  >();
  const [options, setOptions] = useState<ToastOptions>(DEFAULT_TOAST_OPTIONS);

  async function show(
    message: string | ReactNode,
    toastOptions: ToastOptions = {}
  ) {
    setMessage(message);
    setOptions({ ...DEFAULT_TOAST_OPTIONS, ...toastOptions });

    setVisible(true);
    await delay(options?.interval ?? 3000);
    setVisible(false);
  }

  function info(message: string | ReactNode, options?: ToastOptions) {
    setStatus('info');
    show(message, options);
  }

  function warn(message: string | ReactNode, options?: ToastOptions) {
    setStatus('warning');
    show(message, options);
  }

  function success(message: string | ReactNode, options?: ToastOptions) {
    setStatus('success');
    show(message, options);
  }

  function error(message: string | ReactNode, options?: ToastOptions) {
    setStatus('error');
    show(message, options);
  }

  return (
    <ToastContext.Provider
      value={{
        info,
        success,
        warn,
        error,
      }}
    >
      <Slide in={visible} placement={options?.placement ?? 'top'}>
        <Alert
          justifyContent='center'
          status={status}
          safeAreaTop={8}
          shadow='8'
          style={{ paddingTop: getStatusBarHeight() }}
        >
          <HStack alignItems='center' space={2}>
            <Alert.Icon color={colorMap[status]} />

            <Text color={colorMap[status]} fontWeight='bold'>
              {message}
            </Text>
          </HStack>
        </Alert>
      </Slide>

      {children}
    </ToastContext.Provider>
  );
};
