import { ButtonHTMLAttributes } from 'react';
import { ControlButtonType } from '../../types/ControlButtonType';
import './control-button.scss';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ControlButtonType;
  className?: string;
};

export const ControlButton: React.FC<Props> = ({
  buttonType,
  className,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        'control-button',
        `control-button--${buttonType}`,
        className,
      )}
      {...rest}
    />
  );
};
