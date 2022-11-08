import { Text, HStack, Box, useTheme } from 'native-base';
import { CaretLeft, Export, ShareNetwork } from 'phosphor-react-native';
import { ButtonIcon } from './ButtonIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from './Avatar';
import { useSettings } from '../hooks/useSettings';

const SCREEN_WIDTH = Dimensions.get('window').width / 3;

interface Props {
  title: string;
  showBackButton?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  showShareButton = false,
  onShare,
}: Props) {
  const EmptyBoxSpace = () => <Box w={6} h={6} />;

  const { colors, isDark } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const ShareIcon = Platform.OS === 'ios' ? Export : ShareNetwork;

  return (
    <HStack
      w='full'
      h={24}
      bgColor={isDark ? 'card' : 'card'}
      alignItems='flex-end'
      pb={2}
      px={5}
      shadow='4'
    >
      <HStack alignItems='center' w='full'>
        <HStack w='1/4' alignItems='center'>
          {showBackButton ? (
            <ButtonIcon icon={CaretLeft} onPress={() => navigation.goBack()} />
          ) : (
            <EmptyBoxSpace />
          )}
        </HStack>

        <HStack w='1/2' alignItems='center' justifyContent='center'>
          <Text
            color='gray.100'
            fontWeight='medium'
            fontSize='sm'
            textAlign='center'
            numberOfLines={2}
          >
            {title}
          </Text>
        </HStack>

        <HStack alignItems='center' justifyContent='flex-end' space={4} w='1/4'>
          {showShareButton ? (
            <ButtonIcon icon={ShareIcon} onPress={onShare} />
          ) : // <EmptyBoxSpace />
          null}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('myProfile', {
                userId: user.sub,
                isUserProfile: true,
              })
            }
          >
            <Avatar
              userName={user?.name}
              source={{ uri: user?.avatarURL }}
              w={8}
              h={8}
              borderWidth={1}
              borderColor='yellow.500'
              _text={{ fontSize: 'xl' }}
            >
              {user?.initials}
            </Avatar>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </HStack>
  );
}
