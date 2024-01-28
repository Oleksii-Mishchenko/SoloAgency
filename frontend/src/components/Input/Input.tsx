import React, {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import classNames from 'classnames';
import './input.scss';

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
        className={classNames('input__field', 'input__field--textarea', {
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

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
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

export const InputPassword: FC<InputPasswordProps> = ({
  className,
  label,
  register,
  errors,
  ...props
}) => {
  const { name } = register;
  const error = errors[name]?.message as string;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <label className={classNames('input', className)}>
      <p className="input__label">{label}</p>

      <input
        className={classNames('input__field', {
          'input__field--error': !!errors[name],
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

      {errors[name] && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};
