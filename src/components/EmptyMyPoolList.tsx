import { Row, Text, Pressable, VStack } from 'native-base';
import { Share } from 'react-native';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';

interface Props {
  code: string;
}

export function EmptyMyPoolList({ code }: Props) {
  const { i18n } = useSettings();

  const handleShareCode = async () => {
    await Share.share({ message: code });
  };

  return (
    <VStack p={4}>
      <Row flexWrap='wrap' justifyContent='center'>
        <Text color='gray.200' fontSize='sm'>
          {i18n.t('components.emptyMyPoolList.esteBolaoNaoTemParticipantes')}
        </Text>

        <Pressable onPress={handleShareCode}>
          <Text
            textDecorationLine='underline'
            color='yellow.500'
            textDecoration='underline'
          >
            {i18n.t('components.emptyMyPoolList.compartilharCodigo')}
          </Text>
        </Pressable>

        <Text color='gray.200' fontSize='sm' mx={1}>
          {i18n.t('components.emptyMyPoolList.comAlguem')}
        </Text>

        <Text color='gray.200' mr={1}>
          {i18n.t('components.emptyMyPoolList.useCodigo')}
        </Text>
      </Row>

      <Text
        color='gray.200'
        fontSize='3xl'
        textAlign='center'
        fontWeight='bold'
      >
        {code}
      </Text>
    </VStack>
  );
}
