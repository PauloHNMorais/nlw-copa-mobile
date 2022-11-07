import { Avatar as NBAvatar, IAvatarProps, useTheme } from 'native-base';
import { getContrastColor, stringToColour } from '../utils/color';

export type AvatarProps = Partial<IAvatarProps> & {
  userName?: string;
};

export function Avatar(props: AvatarProps) {
  const { colors } = useTheme();

  return (
    <NBAvatar
      source={props.source}
      w={8}
      h={8}
      rounded='full'
      borderColor='card'
      borderWidth={2}
      bgColor={props.userName ? stringToColour(props.userName) : 'gray.500'}
      _text={{
        color: props.userName
          ? getContrastColor(
              stringToColour(props.userName),
              colors.gray[100],
              colors.white
            )
          : 'gray.100',
        ...props._text,
      }}
      {...props}
    >
      {props.children}
    </NBAvatar>
  );
}
