import { useNavigation } from '@react-navigation/native';
import { Row, Text, Pressable } from 'native-base';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';

export function EmptyPoolList() {
  const { navigate } = useNavigation();
  const { i18n } = useSettings();

  return (
    <Row flexWrap='wrap' justifyContent='center'>
      <Text color='gray.100' fontSize='sm' textAlign='center'>
        {i18n.t('components.emptyPoolList.voceNaoEstaParticipando')}
      </Text>

      <Pressable onPress={() => navigate('find')}>
        <Text
          textDecorationLine='underline'
          color='yellow.500'
          textDecoration='underline'
        >
          {i18n.t('components.emptyPoolList.buscarUmPorCodigo')}
        </Text>
      </Pressable>

      <Text color='gray.100' fontSize='sm' textAlign='center' mx={1}>
        {i18n.t('components.emptyPoolList.ou')}
      </Text>

      <Pressable onPress={() => navigate('new')}>
        <Text textDecorationLine='underline' color='yellow.500'>
          {i18n.t('components.emptyPoolList.criarUmNovo')}
        </Text>
      </Pressable>

      <Text color='gray.100' fontSize='sm' textAlign='center'>
        ?
      </Text>
    </Row>
  );
}
