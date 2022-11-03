import { Heading, VStack } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New() {
  return (
    <VStack flex={1} bgColor='black'>
      <Header title='Criar novo bolão' showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />

        <Heading
          fontFamily='heading'
          color='black'
          textAlign='center'
          fontSize='xl'
          my={8}
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder='Qual o nome do seu bolão?' />

        <Button title='Criar meu bolão' />
      </VStack>
    </VStack>
  );
}
