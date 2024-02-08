import React, { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { InputError, Label } from '../../elements';
import './text-area.scss';

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

export const TextArea: FC<TextAreaProps> = ({
  className,
  label,
  register,
  error,
  isRequired,
  ...props
}) => {
  return (
    <div className={classNames('text-area', className)}>
      <Label label={label} isRequired={isRequired} />

      <textarea
        id={label}
        className={classNames('text-area__field', {
          'text-area__field--error': !!error,
        })}
        {...register}
        {...props}
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
