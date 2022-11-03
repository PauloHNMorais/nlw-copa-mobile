import { Center, Icon, Text } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

export const SignIn = () => {
  const { user, signIn } = useAuth();

  return (
    <Center flex={1} bgColor='white'>
      <Logo width={212} height={40} />

      <Button
        title='Entrar com Google'
        type='SECONDARY'
        leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />}
        mt={12}
        onPress={signIn}
      />

      <Text color='black' textAlign='center' mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta
      </Text>
    </Center>
  );
};
