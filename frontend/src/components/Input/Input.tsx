import React, {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { FieldErrors, FieldValues, Noop } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
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

interface InputPhoneNumberProps {
  error: string | undefined;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: Noop;
}

export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  error,
  label,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <label className="input">
      <p className="input__label">{label}</p>
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
        className={classNames('input__field', { 'input__field--error': error })}
        onFocus={() => onChange('+38 (0')}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        type="tel"
      />

      {error && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};
