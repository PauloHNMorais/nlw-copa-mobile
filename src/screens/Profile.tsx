import { useFocusEffect, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import {
  Center,
  HStack,
  Icon,
  Image,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import { Check, Medal, SignOut, SoccerBall } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { useAPI } from '../hooks/useAPI';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../hooks/useSettings';
import { createLocalization } from '../utils/createLocalization';

interface RouteParams {
  userId: string;
  isUserProfile?: boolean;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  createdAt: Date;
  totalScore: number;
  totalPools: number;
  totalRightGuesses: number;
  avatarURL: string;
}

export function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const route = useRoute();
  const { userId, isUserProfile = false } = route.params as RouteParams;
  const { fetchAPI, isLoading } = useAPI();
  const { i18n } = useSettings();

  const [userInfo, setUserInfo] = useState<User>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  async function getUserInfo() {
    try {
      const res = await fetchAPI('get', `/users/${userId}`);
      const data = res.data;
      setUserInfo(data);
    } catch (error) {}
  }

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        getUserInfo();
      }
    }, [userId])
  );

  return (
    <VStack flex={1} bgColor='bg'>
      <Header
        title={
          isUserProfile ? i18n.t('screens.profile.meuPerfil') : userInfo?.name
        }
        showBackButton
      />

      {isLoading && <Loading />}

      <VStack
        bgColor='card'
        my={6}
        mx={5}
        p={4}
        rounded='sm'
        borderBottomWidth={3}
        borderBottomColor='yellow.500'
      >
        <HStack
          borderBottomWidth={1}
          borderBottomColor='gray.600'
          pb={4}
          alignItems='center'
        >
          <TouchableWithoutFeedback onPress={() => setShowProfileModal(true)}>
            <Avatar
              userName={userInfo?.name}
              source={{ uri: userInfo?.avatarURL }}
              w={16}
              h={16}
              mr={4}
              _text={{ fontSize: '2xl' }}
            >
              {userInfo?.initials}
            </Avatar>
          </TouchableWithoutFeedback>

          <VStack>
            <Text color='gray.100' fontSize='lg' fontWeight='bold'>
              {userInfo?.name}
            </Text>

            <Text color='gray.200' fontSize='sm'>
              {userInfo?.email}
            </Text>

            <Text color='gray.200' fontSize='sm'>
              {i18n.t('screens.profile.criadoEm')}{' '}
              {dayjs(userInfo?.createdAt).format('L')}
            </Text>
          </VStack>
        </HStack>

        <HStack justifyContent='space-between'>
          <VStack pt={4} alignItems='center'>
            <HStack alignItems='center'>
              <Medal
                color={theme.colors.yellow[500]}
                size={theme.sizes[6]}
                weight='thin'
              />
              <Text color='yellow.500' fontSize='xl' fontWeight='thin'>
                {userInfo?.totalScore}
              </Text>
            </HStack>
            <Text color='gray.100' fontWeight='thin'>
              {' '}
              {i18n.t('screens.profile.pontosTotais')}
            </Text>
          </VStack>

          <VStack pt={4} alignItems='center'>
            <HStack alignItems='center'>
              <Check
                color={theme.colors.yellow[500]}
                size={theme.sizes[6]}
                weight='thin'
              />
              <Text color='yellow.500' fontSize='xl' fontWeight='thin'>
                {userInfo?.totalRightGuesses}
              </Text>
            </HStack>
            <Text color='gray.100' fontWeight='thin'>
              {' '}
              {i18n.t('screens.profile.palpitesCertos')}
            </Text>
          </VStack>

          <VStack pt={4} alignItems='center'>
            <HStack alignItems='center'>
              <SoccerBall
                color={theme.colors.yellow[500]}
                size={theme.sizes[6]}
                weight='thin'
              />
              <Text color='yellow.500' fontSize='xl' fontWeight='thin'>
                {userInfo?.totalPools}
              </Text>
            </HStack>
            <Text color='gray.100' fontWeight='thin'>
              {' '}
              {i18n.t('screens.profile.boloesCriados')}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      {isUserProfile && (
        <Center mx={5} my={4}>
          <TouchableOpacity>
            <HStack alignItems='center' space={1}>
              <SignOut
                color={theme.colors.red[500]}
                size={theme.sizes[6]}
                weight='bold'
              />
              <Text color='red.500' fontSize='md' fontWeight='medium'>
                {i18n.t('screens.profile.sair')}
              </Text>
            </HStack>
          </TouchableOpacity>
        </Center>
      )}

      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      >
        <Center>
          <Image
            rounded='sm'
            source={{ uri: userInfo?.avatarURL }}
            alt={userInfo?.name}
            size='2xl'
            resizeMode='cover'
          />
        </Center>
      </Modal>
    </VStack>
  );
}
