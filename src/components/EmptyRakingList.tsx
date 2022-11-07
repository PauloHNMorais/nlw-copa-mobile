import { Text } from 'native-base';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';

export function EmptyRakingList() {
  const { i18n } = useSettings();

  return (
    <Text color='white' fontSize='sm' textAlign='center'>
      {i18n.t('components.emptyRankingList.ranking')}
    </Text>
  );
}
