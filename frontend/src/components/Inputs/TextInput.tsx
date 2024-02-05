import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './input.scss';
import { InputError } from '../InputError';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  error: string | undefined;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

export const TextInput: React.FC<TextInputProps> = ({
  className,
  label,
  register,
  error,
  ...props
}) => {
  return (
    <label className={classNames('input', className)}>
      <p className="input__label">{label}</p>

      <input
        className={classNames('input__field', {
          'input__field--error': !!error,
        })}
        type="text"
        {...register}
        {...props}
      />

      {error && <InputError errorMessage={error} />}
    </label>
  );
};
