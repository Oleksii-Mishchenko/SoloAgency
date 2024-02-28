import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import { InputError, Label } from '../../elements';
import './input-phone-number.scss';
import { Noop } from 'react-hook-form';

interface InputPhoneNumberProps {
  error: string | undefined;
  label: string;
  isRequired?: boolean;
  value?: string | null;
  onChange: (value: string) => void;
  onBlur: Noop;
}

export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  error,
  label,
  isRequired,
  value,
  onChange,
  onBlur,
}) => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      onChange('+38 (');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '+38 (' || !e.target.value) {
      onChange('');
    }
    onBlur();
  };

  return (
    <div className="input-phone-number">
      <Label label={label} isRequired={isRequired} />

      <MaskedInput
        mask={[
          '+',
          '3',
          '8',
          ' ',
          '(',
          /\d/,
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
        ]}
        placeholder="+38 (0__ ) ___-__-__"
        value={value || ''}
        className={classNames('input-phone-number__field', {
          'input-phone-number__field--error': error,
        })}
        onChange={event => onChange(event.target.value)}
        onFocus={event => handleFocus(event)}
        onBlur={event => handleBlur(event)}
        type="tel"
        id={label}
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
