import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { useTheme } from 'native-base';
import { useSettings } from '../hooks/useSettings';
import { Details } from '../screens/Details';
import { Find } from '../screens/Find';
import { Pools } from '../screens/Pools';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createStackNavigator();

export function MyPoolsRoutes() {
  const { colors, sizes } = useTheme();
  const { i18n } = useSettings();

  const size = sizes[6];

  return (
    <Navigator
      initialRouteName='myPools'
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}
    >
      <Screen name='myPools' component={Pools} />
      <Screen name='details' component={Details} />
      <Screen name='find' component={Find} />
      <Screen name='userProfile' component={Profile} />
    </Navigator>
  );
}
