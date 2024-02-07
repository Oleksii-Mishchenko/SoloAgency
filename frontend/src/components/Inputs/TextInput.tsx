import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import './input.scss';
import { InputError } from '../InputError';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  error: string | undefined;
  isRequired?: boolean;
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
  isRequired,
  ...props
}) => {
  return (
    <label className={classNames('input', className)}>
      <p
        className={classNames('input__label', {
          'input__label--is-required': isRequired,
        })}
      >
        {label}
      </p>

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
