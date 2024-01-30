import React, {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import {
  Controller,
  FieldErrors,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import InputMask from 'react-input-mask';
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
  errors: FieldErrors;
  name: string;
  label: string;
}

export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  name,
  errors,
  label,
}) => {
  const { control, register } = useFormContext();
  const error = errors[name]?.message as string;

  const phoneNumberValidation = {
    required: "Поле є обов'язковим",
    pattern: {
      value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      message: 'Введіть правильний номер телефону',
    },
  };

  return (
    <label className="input">
      <p className="input__label">{label}</p>
      <Controller
        {...register}
        name={name}
        control={control}
        rules={phoneNumberValidation}
        render={({ field }) => (
          <>
            <InputMask
              {...field}
              mask="+38 (099) 999-99-99"
              maskChar={null}
              placeholder="+38 (0__ ) ___-__-__"
              type="tel"
            />

            {errors[name] && (
              <p className="input__error">
                {error || 'Помилка при валідації даних.'}
              </p>
            )}
          </>
        )}
      />
    </label>
  );
};
