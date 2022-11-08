import { useFocusEffect, useRoute } from '@react-navigation/native';
import { HStack, Slide, VStack } from 'native-base';
import { useCallback, useState } from 'react';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { useAPI } from '../hooks/useAPI';
import { PoolPros } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { createLocalization } from '../utils/createLocalization';
import { Share } from 'react-native';
import { Guesses } from '../components/Guesses';
import Rankings from '../components/Rankings';
import { useSettings } from '../hooks/useSettings';

interface RouteParams {
  id: string;
  title: string;
}

export function Details() {
  const [pool, setPool] = useState<PoolPros>();
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'ranking'>(
    'guesses'
  );

  const route = useRoute();
  const { id, title } = route.params as RouteParams;
  const { fetchAPI, isLoading } = useAPI();
  const { i18n } = useSettings();

  async function fetchPoolDetails() {
    try {
      const res = await fetchAPI('get', `/pools/${id}`);
      const data = res.data;
      setPool(data);
    } catch (error) {}
  }

  async function handleCodeShare() {
    const code = pool?.code ?? '';

    await Share.share({
      message: code,
    });
  }

  useFocusEffect(
    useCallback(() => {
      fetchPoolDetails();
    }, [id])
  );

  return (
    <VStack flex={1} bgColor='bg'>
      <Header
        title={title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {!!pool && <PoolHeader data={pool} />}

      {isLoading ? (
        <Loading />
      ) : pool?._count?.participants ? (
        <VStack px={5} flex={1}>
          <HStack bgColor='card' p={1} rounded='sm' mb={5}>
            <Option
              title={i18n.t('screens.details.seusPalpites')}
              isSelected={selectedOption === 'guesses'}
              onPress={() => setSelectedOption('guesses')}
            />
            <Option
              title={i18n.t('screens.details.rankingDoGrupo')}
              isSelected={selectedOption === 'ranking'}
              onPress={() => setSelectedOption('ranking')}
            />
          </HStack>

          {selectedOption === 'guesses' && <Guesses poolId={pool?.id} />}

          {selectedOption === 'ranking' && <Rankings poolId={pool?.id} />}
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool?.code ?? ''} />
      )}
    </VStack>
  );
}
