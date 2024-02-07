import React, { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { InputError } from '../InputError';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  label: string;
  error: string | undefined;
  isRequired?: boolean;
  register: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    ref: React.RefCallback<HTMLTextAreaElement>;
    name: string;
  };
};

export const Textarea: FC<TextAreaProps> = ({
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

      <textarea
        className={classNames('input__field', 'input__field--textarea', {
          'input__field--error': !!error,
        })}
        {...register}
        {...props}
      />

      {error && <InputError errorMessage={error} />}
    </label>
  );
};
