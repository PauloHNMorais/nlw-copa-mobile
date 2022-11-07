import { Heading, HStack, Text, VStack } from 'native-base';

import { PoolPros } from './PoolCard';
import { Participants } from './Participants';
import { createLocalization } from '../utils/createLocalization';
import { useSettings } from '../hooks/useSettings';

interface Props {
  data: PoolPros;
}

export function PoolHeader({ data }: Props) {
  const { i18n } = useSettings();

  return (
    <HStack
      w='full'
      h={20}
      bgColor='transparent'
      borderBottomWidth={1}
      borderBottomColor='gray.600'
      justifyContent='space-between'
      alignItems='center'
      mb={3}
      p={4}
    >
      <VStack>
        <Heading color='gray.100' fontSize='md' fontWeight='bold'>
          {data.title}
        </Heading>

        <HStack>
          <Text color='gray.200' fontSize='xs' mr={1}>
            {i18n.t('components.poolHeader.codigo')}
          </Text>

          <Text color='gray.200' fontSize='xs' fontWeight='bold'>
            {data.code}
          </Text>
        </HStack>
      </VStack>

      <Participants
        count={data._count?.participants}
        participants={data.participants}
      />
    </HStack>
  );
}
