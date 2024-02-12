import { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { InputError, Label } from '../../elements';
import { ControlButtonType } from '../../../../../types/ControlButtonType';
import { ControlButton } from '../../../buttons';
import './input-password.scss';

type InputPasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error: string | undefined;
  register: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    ref: React.RefCallback<HTMLInputElement>;
    name: string;
  };
};

export const InputPassword: React.FC<InputPasswordProps> = ({
  className,
  label,
  register,
  error,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className={classNames('input-password', className)}>
      <Label label={label} isRequired />

      <input
        id={label}
        className={classNames('input-password__field', {
          'input-password__field--error': !!error,
        })}
        type={isPasswordVisible ? 'text' : 'password'}
        {...register}
        {...props}
      />

      <ControlButton
        type="button"
        className="input-password__button"
        buttonType={
          isPasswordVisible ? ControlButtonType.EyeOff : ControlButtonType.Eye
        }
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
