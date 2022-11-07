import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Gear, PlusCircle, SoccerBall } from 'phosphor-react-native';
import { Platform } from 'react-native';
import { useSettings } from '../hooks/useSettings';
import { Details } from '../screens/Details';
import { Find } from '../screens/Find';
import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Profile } from '../screens/Profile';
import { Settings } from '../screens/Settings';
import { createLocalization } from '../utils/createLocalization';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { colors, sizes } = useTheme();
  const { i18n } = useSettings();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: colors.gray[600],
          backgroundColor: colors.card,
          marginRight: -sizes[20],
        },
        tabBarItemStyle: {
          position: 'relative',
          // top: Platform.OS === 'ios' ? 0 : -10,
        },
      }}
    >
      <Screen
        name='new'
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: i18n.t('routes.novo'),
        }}
      />
      <Screen
        name='pools'
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: i18n.t('routes.boloes'),
        }}
      />

      <Screen
        name='settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <Gear color={color} size={size} />,
          headerLeftLabelVisible: false,
          tabBarLabelStyle: { color: 'transparent' },
        }}
      />

      <Screen
        name='find'
        component={Find}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name='details'
        component={Details}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name='profile'
        component={Profile}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
