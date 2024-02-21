import { useState, FC, memo } from 'react';
import Select, { SingleValue } from 'react-select';
import { Label } from '../../elements';
import { OrderStatus } from '../../../../../types/OrderStatus';
import { statusOpts } from '../../../../../assets/libs/translations/statusUa';
import { SelectOption } from '../../../../../types/SelectOption';
import './dropdown.scss';

type Props = {
  inputLabel: string;
  value: OrderStatus;
  isLoading: boolean;
  onChange: (newValue: SingleValue<SelectOption<OrderStatus>>) => void;
};

export const OrderSelect: FC<Props> = memo(
  ({ inputLabel, value, onChange, isLoading }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const getValue = (newValue: OrderStatus) => {
      return statusOpts.find(option => option.value === newValue);
    };

    return (
      <div className="event-order__dropdown dropdown">
        <Label label={inputLabel} />

        <Select
          inputId={inputLabel}
          options={statusOpts}
          isLoading={isLoading}
          isSearchable={false}
          value={getValue(value)}
          onChange={onChange}
          classNamePrefix="dropdown"
          menuIsOpen={isMenuOpen}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          onFocus={onMenuOpen}
        />
      </div>
    );
  },
);
