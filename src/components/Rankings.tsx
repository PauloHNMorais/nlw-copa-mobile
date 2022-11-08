import { FlatList, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { useAPI } from '../hooks/useAPI';
import { Loading } from './Loading';
import { RankingCard } from './RankingCard';
import { RefreshControl } from './RefreshControl';

interface Props {
  poolId: string;
}

export default function Rankings({ poolId }: Props) {
  const { fetchAPI, isLoading } = useAPI();
  const [usersScores, setUsersScores] = useState([]);

  async function fetchScores() {
    try {
      const res = await fetchAPI('get', `/pools/${poolId}/users/scores`);
      const data = res.data;
      setUsersScores(data);
    } catch (error) {}
  }

  useEffect(() => {
    if (poolId) {
      fetchScores();
    }
  }, [poolId]);

  if (isLoading && !usersScores.length) {
    return <Loading />;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchScores} />
      }
      data={usersScores}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <RankingCard position={index + 1} data={item} />
      )}
    />
  );
}
