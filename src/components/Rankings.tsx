import { FlatList, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { useAPI } from '../hooks/useAPI';
import { RankingCard } from './RankingCard';

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

  return (
    <FlatList
      data={usersScores}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <RankingCard position={index + 1} data={item} />
      )}
    />
  );
}
