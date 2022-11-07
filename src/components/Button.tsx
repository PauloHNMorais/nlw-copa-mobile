import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w='full'
      h={14}
      rounded='sm'
      fontSize='md'
      textTransform='uppercase'
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600',
      }}
      _loading={{
        _spinner: { color: 'white' },
        _text: { color: 'white' },
      }}
      {...rest}
    >
      <Text
        fontSize='sm'
        fontWeight='bold'
        color={type === 'SECONDARY' ? 'gray.100' : 'white'}
        textTransform='uppercase'
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
