import { Center, Icon, Text } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { createLocalization } from '../utils/createLocalization';
import { useSettings } from '../hooks/useSettings';

export const SignIn = () => {
  const { user, signIn, isUserLoading } = useAuth();
  const { i18n } = useSettings();

  return (
    <Center flex={1} bgColor='bg'>
      <Logo width={212} height={40} />

      <Button
        title={i18n.t('screens.signIn.entrarComGoogle')}
        type='SECONDARY'
        leftIcon={
          <Icon as={Fontisto} name='google' color='gray.100' size='md' />
        }
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
      />

      <Text color='gray.100' textAlign='center' mt={4}>
        {i18n.t('screens.signIn.naoUtilizamosNenhumaInformacao')}
      </Text>
    </Center>
  );
};
