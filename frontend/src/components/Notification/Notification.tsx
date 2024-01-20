import classNames from 'classnames';
import { ServerErrorResponse } from '../../types/ServerErrorResponse';
import './notification.scss';
import { Errors } from '../Errors';
import { MainButton } from '../MainButton';
import { useRef } from 'react';
import { useOuterClick } from '../../customHooks/useOuterClick';

type Props = {
  className: string;
  message: string;
  errors?: ServerErrorResponse;
  onClose: () => void;
};

export const Notification: React.FC<Props> = ({
  className,
  message,
  errors,
  onClose,
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useOuterClick(notificationRef, onClose);

  return (
    <div
      ref={notificationRef}
      className={classNames(className, 'notification', {
        'notification--error': !!errors,
      })}
    >
      <p className="notification__message">{message}</p>

      {errors && <Errors className="notification__errors" errors={errors} />}

      <MainButton
        text="Закрити"
        className="notification__button"
        onClick={onClose}
      />
    </div>
  );
};
