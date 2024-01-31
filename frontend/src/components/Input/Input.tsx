import React, { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './input.scss';
import { FieldErrors, FieldValues } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errors: FieldErrors<FieldValues>;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  errors: FieldErrors<FieldValues>;
  register: {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    ref: React.RefCallback<HTMLTextAreaElement>;
    name: string;
  };
};

export const Input: FC<InputProps> = ({ register, errors, ...props }) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <>
      <input className="input" {...register} {...props} />
      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </>
  );
};

export const Textarea: FC<TextAreaProps> = ({ register, errors, ...props }) => {
  const { name } = register;
  const error = errors[name]?.message as string;

  return (
    <>
      <textarea className="input input--textarea" {...register} {...props} />
      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </>
  );
};
