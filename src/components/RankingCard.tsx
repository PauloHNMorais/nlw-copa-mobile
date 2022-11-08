import { useNavigation } from '@react-navigation/native';
import { Center, HStack, Text, VStack } from 'native-base';
import { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';
import { Avatar } from './Avatar';

interface UserScoreProps {
  id: string;
  name: string;
  avatarURL: string;
  score: number;
  initials: string;
}

interface Props {
  data: UserScoreProps;
  position: number;
}

export function RankingCard({ position, data }: Props) {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const { i18n } = useSettings();

  const highlightPosition = useMemo(() => {
    return position <= 3 && data.score > 0;
  }, [position, data.score]);

  return (
    <HStack
      w='full'
      bgColor='card'
      rounded='sm'
      alignItems='center'
      justifyContent='space-between'
      borderBottomWidth={3}
      borderBottomColor={highlightPosition ? 'yellow.500' : 'gray.600'}
      mb={3}
      p={4}
    >
      <TouchableOpacity
        onPress={() =>
          navigate(data.id === user.sub ? 'myProfile' : 'userProfile', {
            userId: data?.id,
            isUserProfile: data.id === user.sub,
          })
        }
      >
        <HStack>
          <Avatar
            key={data.id}
            userName={data?.name}
            source={{ uri: data.avatarURL }}
            w={12}
            h={12}
            borderWidth={2}
            mr={4}
            _text={{
              fontSize: 'xl',
            }}
          >
            {data?.initials}
          </Avatar>

          <VStack>
            <Text color='gray.100' fontSize='md' fontWeight='bold'>
              {data.name}
            </Text>

            <Text color='gray.200' fontSize='sm'>
              {data.score} {i18n.t('components.rankingCard.pontos')}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>

      <Center
        backgroundColor={highlightPosition ? 'yellow.500' : 'gray.600'}
        w={10}
        h={6}
        rounded='full'
      >
        <Text
          color={highlightPosition ? 'white' : 'gray.300'}
          fontSize='md'
          fontWeight='bold'
        >
          {position}º
        </Text>
      </Center>
    </HStack>
  );
}
