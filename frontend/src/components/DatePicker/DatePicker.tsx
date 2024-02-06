import { InputError } from '../InputError';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import uk from 'date-fns/locale/uk';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';

type Props = {
  label: string;
  error: string | undefined;
  value: Date;
  onChange: (value: Date | null) => void;
};

export const DatePicker: React.FC<Props> = ({
  label,
  error,
  value,
  onChange,
}) => {
  registerLocale('uk', uk);
  return (
    <div className="date-picker">
      <label htmlFor={label} className="date-picker__label">
        {label}
      </label>

      <div className="date-picker__wrapper">
        <ReactDatePicker
          id={label}
          selected={value}
          onChange={newDate => onChange(newDate)}
          minDate={new Date()}
          dateFormat={'dd.MM.yyyy'}
          locale={'uk'}
          placeholderText="дд.мм.рррр"
          autoComplete="off"
          closeOnScroll
          showPopperArrow={false}
          className={classNames('date-picker__input', {
            'date-picker__input--error': error,
          })}
          popperClassName="date-picker__popper"
          calendarClassName="date-picker__datepicker"
          customInput={
            <MaskedInput
              type="text"
              mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
            />
          }
        />
      </div>

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
