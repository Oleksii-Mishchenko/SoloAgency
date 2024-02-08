import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { InputError } from '../../elements/InputError';
import './text-input.scss';
import { Label } from '../../elements/Label';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
  error: string | undefined;
  isRequired?: boolean;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

export const TextInput: React.FC<TextInputProps> = ({
  className,
  label,
  register,
  error,
  isRequired,
  ...props
}) => {
  return (
    <div className={classNames('text-input', className)}>
      <Label label={label} isRequired={isRequired} />

      <input
        id={label}
        className={classNames('text-input__field', {
          'text-input__field--error': !!error,
        })}
        type="text"
        {...register}
        {...props}
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
