import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Box, FlatList } from 'native-base';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAPI } from '../hooks/useAPI';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';
import { Game } from './Game';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [games, setGames] = useState([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const { fetchAPI, isLoading } = useAPI();
  const navigation = useNavigation();
  const { i18n } = useSettings();

  async function fetchGames() {
    try {
      const res = await fetchAPI('get', `/pools/${poolId}/games`);
      const data = res.data;
      setGames(data);
    } catch (error) {}
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        Alert.alert(
          i18n.t('components.guesses.ops'),
          i18n.t('components.guesses.informePlacar')
        );
        return;
      }

      await fetchAPI('post', `/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      fetchGames();

      setFirstTeamPoints('');
      setSecondTeamPoints('');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          Alert.alert(
            i18n.t('components.guesses.ops'),
            error.response.data.message
          );
        }
      }
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setFirstTeamPoints('');
      setSecondTeamPoints('');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (poolId) {
      fetchGames();
    }
  }, [poolId]);

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps='handled'
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
    />
  );
}
