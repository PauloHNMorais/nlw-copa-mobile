import { Heading, Text, useToast, VStack } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { createLocalization } from '../utils/createLocalization';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { useAPI } from '../hooks/useAPI';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../hooks/useSettings';

export function New() {
  const [title, setTitle] = useState('');
  const toast = useToast();
  const { isUserLoading } = useAuth();
  const { navigate } = useNavigation();
  const { fetchAPI, isLoading } = useAPI();
  const { i18n } = useSettings();

  async function handlePoolCreate() {
    if (!title.trim()) {
      Alert.alert(
        i18n.t('screens.new.opa'),
        i18n.t('screens.new.informeUmTitulo')
      );
      // toast.show({
      //   description: i18n.t('informUmTitulo'),
      // });
      return;
    }

    try {
      await fetchAPI('post', '/pools', {
        title: title.trim(),
      });

      setTitle('');

      navigate('pools');
    } catch (error) {}
  }

  return (
    <VStack flex={1} bgColor='bg'>
      <Header title={i18n.t('screens.new.criarNovoBolao')} />

      <VStack mt={8} mx={5} alignItems='center'>
        <Logo />

        <Heading
          fontWeight='bold'
          color='gray.100'
          textAlign='center'
          fontSize='xl'
          my={8}
        >
          {i18n.t('screens.new.crieSeuProprioBolao')}
        </Heading>

        <Input
          mb={2}
          placeholder={i18n.t('screens.new.qualNome')}
          autoCapitalize='sentences'
          value={title}
          onChangeText={setTitle}
        />

        <Button
          title={i18n.t('screens.new.criarMeuBolao')}
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color='gray.200' textAlign='center' my={4} mx={4}>
          {i18n.t('screens.new.aposCriarSeuBolao')}
        </Text>
      </VStack>
    </VStack>
  );
}
