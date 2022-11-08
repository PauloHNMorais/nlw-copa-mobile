import { Center, Fade, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg='bg'>
      <Fade in>
        <Spinner color='yellow.500' size='lg' />
      </Fade>
    </Center>
  );
}
