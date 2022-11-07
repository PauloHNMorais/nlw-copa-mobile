import { Center, HStack, Text } from 'native-base';
import { Avatar } from './Avatar';

export interface ParticipantProps {
  id: string;
  user: {
    name: string;
    avatarURL: string;
    initials: string;
  };
}

interface Props {
  participants: ParticipantProps[];
  count: number;
}

export function Participants({ participants, count }: Props) {
  return (
    <HStack>
      {participants &&
        participants.map((participant) => (
          <Avatar
            key={participant.id}
            userName={participant.user?.name}
            source={{ uri: participant.user.avatarURL }}
            w={8}
            h={8}
            marginRight={-3}
            borderColor='card'
          >
            {participant.user?.initials}
          </Avatar>
        ))}

      <Center
        w={8}
        h={8}
        bgColor='gray.700'
        rounded='full'
        borderWidth={1}
        borderColor='card'
      >
        <Text color='gray.100' fontSize='xs' fontWeight='medium'>
          {count ? `+${count}` : 0}
        </Text>
      </Center>
    </HStack>
  );
}
