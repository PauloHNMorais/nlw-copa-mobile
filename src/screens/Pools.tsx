import { FlatList, Icon, VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAPI } from '../hooks/useAPI';
import { Loading } from '../components/Loading';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { PoolCard, PoolPros } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { useSettings } from '../hooks/useSettings';

export function Pools() {
  const { navigate } = useNavigation();
  const { fetchAPI, isLoading } = useAPI();
  const [pools, setPools] = useState<PoolPros[]>([]);
  const { i18n } = useSettings();

  async function fetchPools() {
    try {
      const res = await fetchAPI('get', '/pools');
      const data = res.data;
      setPools(data);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor='bg'>
      <Header title={i18n.t('screens.pools.meusBoloes')} />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}
      >
        <Button
          title={i18n.t('screens.pools.buscarBolao')}
          leftIcon={
            <Icon as={Octicons} name='search' color='white' size='md' />
          }
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() =>
                navigate('details', { id: item.id, title: item.title })
              }
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}
