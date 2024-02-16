import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import * as eventsActions from '../../../../../features/eventsSlice';
import { Label } from '../../elements';
import { EventStatus } from '../../../../../types/Event';
import { statusUa } from '../../../../../assets/libs/translations/statusUa';
import './dropdown.scss';

type Props = {
  inputLabel: string;
  value: EventStatus;
  id: number;
};

export const OrderSelect: React.FC<Props> = ({ inputLabel, value, id }) => {
  const dispatch = useAppDispatch();
  const { isStatusChanging } = useAppSelector(state => state.events);
  const entries: [EventStatus, string][] = Object.entries(statusUa).map(
    ([key, value]) => [key as EventStatus, value],
  );
  const options = entries.map(([value, label]) => ({ value, label }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const getValue = (newValue: EventStatus) => {
    return options.find(option => option.value === newValue);
  };

  const handleChange = (
    newValue: SingleValue<{ value: EventStatus; label: string }>,
  ) => {
    const status = newValue?.value;

    if (status === value) {
      return;
    }

    if (status) {
      dispatch(eventsActions.changeStatus({ id, status }));
    }
  };

  return (
    <div className="event-order__dropdown dropdown">
      <Label label={inputLabel} />

      <Select
        inputId={inputLabel}
        options={options}
        isLoading={isStatusChanging}
        isSearchable={false}
        value={getValue(value)}
        onChange={handleChange}
        classNamePrefix="dropdown"
        menuIsOpen={isMenuOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onFocus={onMenuOpen}
      />
    </div>
  );
};
