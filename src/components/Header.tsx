import { Text, HStack, Box, useTheme } from 'native-base';
import { CaretLeft, Export, ShareNetwork } from 'phosphor-react-native';
import { ButtonIcon } from './ButtonIcon';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform, TouchableOpacity, useColorScheme } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from './Avatar';
import { useSettings } from '../hooks/useSettings';

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
      pb={5}
      px={5}
    >
      <HStack w='full' alignItems='center' justifyContent='space-between'>
        {showBackButton ? (
          <ButtonIcon
            icon={CaretLeft}
            onPress={() => navigation.navigate('pools')}
          />
        ) : (
          <EmptyBoxSpace />
        )}

        <Text
          color='gray.100'
          fontWeight='medium'
          fontSize='md'
          textAlign='center'
          numberOfLines={1}
        >
          {title}
        </Text>

        <HStack alignItems='center' space={4}>
          {showShareButton ? (
            <ButtonIcon icon={ShareIcon} onPress={onShare} />
          ) : // <EmptyBoxSpace />
          null}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('profile', {
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
