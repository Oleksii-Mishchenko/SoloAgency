import { ButtonHTMLAttributes } from 'react';
import { ControlButtonType } from '../../../../types/ControlButtonType';
import classNames from 'classnames';
import './control-button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType: ControlButtonType;
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
