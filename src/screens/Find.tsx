import { Heading, Text, VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { createLocalization } from '../utils/createLocalization';
import { useAPI } from '../hooks/useAPI';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../hooks/useSettings';

export function Find() {
  const [code, setCode] = useState('');
  const { fetchAPI, isLoading } = useAPI();
  const { navigate } = useNavigation();
  const { i18n } = useSettings();

  async function handleJoinPool() {
    try {
      if (!code.trim()) {
        Alert.alert(
          i18n.t('screens.find.ops'),
          i18n.t('screens.find.informeCodigo')
        );
        return;
      }

      await fetchAPI('post', 'pools/join', {
        code,
      });

      setCode('');
      navigate('pools');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          Alert.alert(i18n.t('ops'), error.response.data.message);
        }
      }
    }
  }

  return (
    <VStack flex={1} bgColor='bg'>
      <Header title={i18n.t('screens.find.buscaPorCodigo')} showBackButton />

      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontWeight='bold'
          color='gray.100'
          textAlign='center'
          fontSize='xl'
          my={8}
        >
          {i18n.t('screens.find.encontreUmBolao')}
        </Heading>

        <Input
          mb={2}
          placeholder={i18n.t('screens.find.qualCodigo')}
          textTransform='capitalize'
          autoCapitalize='characters'
          maxLength={6}
          value={code}
          onChangeText={(v) => setCode(v.toUpperCase().trim())}
        />

        <Button
          title={i18n.t('screens.find.buscarBolao')}
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
