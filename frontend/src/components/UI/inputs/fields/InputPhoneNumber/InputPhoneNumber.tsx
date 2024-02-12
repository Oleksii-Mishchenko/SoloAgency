import classNames from 'classnames';
import { Noop } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import { InputError, Label } from '../../elements';
import './input-phone-number.scss';

interface InputPhoneNumberProps {
  error: string | undefined;
  label: string;
  isRequired?: boolean;
  value: string;
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
          '0',
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
        value={value}
        className={classNames('input-phone-number__field', {
          'input-phone-number__field--error': error,
        })}
        onFocus={() => onChange('+38 (0')}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        type="tel"
        id={label}
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
