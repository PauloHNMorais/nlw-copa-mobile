import {
  Box,
  Center,
  NativeBaseProvider,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import { THEME } from './src/styles/theme';
import { useColorScheme } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { New } from './src/screens/New';

export default function App() {
  const colorScheme = useColorScheme() || 'light';
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME.light}>
      <AuthContextProvider>
        <StatusBar
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <New /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
