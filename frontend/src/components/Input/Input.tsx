import React, { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './input.scss';
import { FieldErrors, FieldValues } from 'react-hook-form';
import classNames from 'classnames';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
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
  register,
  errors,
  ...props
}) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <>
      <input
        className={classNames('input', className)}
        {...register}
        {...props}
      />
      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </>
  );
};

export const Textarea: FC<TextAreaProps> = ({
  className,
  register,
  errors,
  ...props
}) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <>
      <textarea
        className={classNames('input', 'input--textarea', className)}
        {...register}
        {...props}
      />
      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </>
  );
};
