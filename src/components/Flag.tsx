import { Image, IImageProps } from 'native-base';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';

export function Flag({ ...rest }: IImageProps) {
  const { i18n } = useSettings();

  return (
    <Image
      {...rest}
      alt={i18n.t('components.flag.bandeira')}
      w={8}
      h={6}
      mx={3}
    />
  );
}
