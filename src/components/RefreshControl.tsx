import { useTheme } from 'native-base';
import {
  RefreshControl as RNRefreshControl,
  RefreshControlProps,
} from 'react-native';

export function RefreshControl(props: RefreshControlProps) {
  const { colors } = useTheme();

  return (
    <RNRefreshControl
      colors={[colors.yellow[500]]}
      tintColor={colors.yellow[500]}
      progressBackgroundColor={colors.card}
      {...props}
    />
  );
}
