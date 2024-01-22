import { ButtonHTMLAttributes } from 'react';
import { ControlButtonType } from '../../types/ControlButtonType';
import './control-button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ControlButtonType;
};

export const ControlButton: React.FC<Props> = ({ buttonType, ...rest }) => {
  return (
    <button
      className={`control-button control-button--${buttonType}`}
      {...rest}
    />
  );
};
