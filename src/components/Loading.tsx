import { Center, Spinner } from 'native-base';

export const Loading = () => {
  return (
    <Center flex={1} bgColor='white'>
      <Spinner color='yellow.500' size='lg' />
    </Center>
  );
};
