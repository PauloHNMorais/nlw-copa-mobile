import { Button, Center, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
// import { getName } from 'country-list';
import * as Localization from 'expo-localization';
import { Team } from './Team';
import dayjs from 'dayjs';
import { useSettings } from '../hooks/useSettings';
import { countriesListEN } from '../utils/countriesListEN';
import { countriesListPTBR } from '../utils/countriesListPTBR';

import countriesEN from '../translations/countries-en.json';
import countriesPTBR from '../translations/countries-pt-br.json';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
  date: Date;
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme();
  const { i18n, language } = useSettings();

  const getName = (
    code: keyof typeof countriesEN & keyof typeof countriesPTBR
  ) => {
    if (language === 'en') {
      return countriesEN[code] || code;
    } else {
      return countriesPTBR[code] || code;
    }
  };

  return (
    <VStack
      w='full'
      bgColor='card'
      rounded='sm'
      alignItems='center'
      borderBottomWidth={3}
      borderBottomColor='yellow.500'
      mb={3}
      p={4}
    >
      <Text color='gray.100' fontWeight='bold' fontSize='sm' textAlign='center'>
        {getName(data.firstTeamCountryCode)} vs.{' '}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color='gray.200' fontSize='xs'>
        {dayjs(data.date).format('LLL')}
      </Text>

      <HStack
        mt={4}
        w='full'
        justifyContent='space-between'
        alignItems='center'
      >
        <Team
          code={data.firstTeamCountryCode}
          position='right'
          onChangeText={setFirstTeamPoints}
          inputDisabled={!!data.guess}
          teamPoints={data.guess?.firstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position='left'
          onChangeText={setSecondTeamPoints}
          inputDisabled={!!data.guess}
          teamPoints={data.guess?.secondTeamPoints}
        />
      </HStack>

      {!data.guess && (
        <Button
          size='xs'
          w='full'
          bgColor='green.500'
          mt={4}
          onPress={onGuessConfirm}
        >
          <HStack alignItems='center'>
            <Text color='white' fontSize='xs' fontWeight='bold' mr={3}>
              {i18n.t('components.game.confirmarPalpite').toUpperCase()}
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}

      {/* <Center
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        mt={4}
        w='full'
      /> */}
    </VStack>
  );
}
