import React, { FC, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { InputError } from '../InputError';

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
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

export const InputPassword: FC<InputPasswordProps> = ({
  className,
  label,
  register,
  error,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <label className={classNames('input', className)}>
      <p className="input__label input__label--is-required">{label}</p>

      <input
        className={classNames('input__field', {
          'input__field--error': !!error,
        })}
        type={isPasswordVisible ? 'text' : 'password'}
        {...register}
        {...props}
      />

      <button
        type="button"
        className={classNames('input__eye', {
          'input__eye--off': isPasswordVisible,
        })}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      {error && <InputError errorMessage={error} />}
    </label>
  );
};
