import { Select as NBSelect, ISelectProps, CheckIcon } from 'native-base';
import { ISelectComponentType } from 'native-base/lib/typescript/components/primitives/Select';

export type SelectProps = Partial<ISelectProps> & {};

export const SelectItem = NBSelect.Item;

export function Select(props: SelectProps) {
  return (
    <NBSelect
      _selectedItem={{
        startIcon: <CheckIcon size='5' color='yellow.500' />,
      }}
      _actionSheetContent={{
        bgColor: 'card',
      }}
      borderColor='gray.600'
      _item={{
        bgColor: 'card',
        _text: {
          color: 'gray.200',
        },
      }}
      {...props}
    />
  );
}
