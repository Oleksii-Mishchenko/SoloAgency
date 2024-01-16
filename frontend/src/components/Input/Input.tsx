import React, { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './input.scss';
import { FieldErrors, FieldValues } from 'react-hook-form';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  errors: FieldErrors<FieldValues>;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  label: string;
  errors: FieldErrors<FieldValues>;
  register: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    ref: React.RefCallback<HTMLTextAreaElement>;
    name: string;
  };
};

export const Input: FC<InputProps> = ({
  className,
  label,
  register,
  errors,
  ...props
}) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <label className={classNames('input', className)}>
      <p className="input__label">{label}</p>

      <input
        className={classNames('input__field', {
          'input__field--error': !!errors[name],
        })}
        {...register}
        {...props}
      />

      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};

export const Textarea: FC<TextAreaProps> = ({
  className,
  label,
  register,
  errors,
  ...props
}) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <label className={classNames('input', className)}>
      <p className="input__label">{label}</p>

      <textarea
        className="input__field input__field--textarea"
        {...register}
        {...props}
      />

      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};
