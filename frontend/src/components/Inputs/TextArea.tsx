import React, { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  label: string;
  error: string | undefined;
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
  ...props
}) => {
  return (
    <label className={classNames('input', className)}>
      <p className="input__label">{label}</p>

      <textarea
        className={classNames('input__field', 'input__field--textarea', {
          'input__field--error': !!error,
        })}
        {...register}
        {...props}
      />

      {error && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};
