import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Heading, HStack, Text, VStack } from 'native-base';

import { Participants, ParticipantProps } from './Participants';
import { createLocalization } from '../utils/createLocalization';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';

export interface PoolPros {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
    id: string;
  };
  participants: ParticipantProps[];
  _count: {
    participants: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: PoolPros;
}

export function PoolCard({ data, ...rest }: Props) {
  const { user } = useAuth();
  const { i18n } = useSettings();

  return (
    <TouchableOpacity {...rest}>
      <HStack
        w='full'
        h={20}
        bgColor='card'
        borderBottomWidth={3}
        borderBottomColor='yellow.500'
        justifyContent='space-between'
        alignItems='center'
        rounded='sm'
        mb={3}
        p={4}
      >
        <VStack>
          <Heading color='gray.100' fontSize='md' fontWeight='bold'>
            {data.title}
          </Heading>

          <Text color='gray.200' fontSize='xs'>
            {i18n.t('components.poolCard.criadoPor')} {data.owner.name}{' '}
            {data.owner.id === user.sub && i18n.t('components.poolCard.voce')}
          </Text>
        </VStack>

        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </HStack>
    </TouchableOpacity>
  );
}
