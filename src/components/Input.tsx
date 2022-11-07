import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg='card'
      h={14}
      px={4}
      borderColor='gray.600'
      fontSize='md'
      color='gray.100'
      placeholderTextColor='gray.300'
      _focus={{
        bg: 'card',
        borderColor: 'gray.600',
      }}
      {...rest}
    />
  );
}
