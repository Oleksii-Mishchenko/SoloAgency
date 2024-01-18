import classNames from 'classnames';
import { ServerErrorResponse } from '../../types/ServerErrorResponse';
import './notification.scss';
import { Errors } from '../Errors';
import { MainButton } from '../MainButton';

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
  return (
    <div
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
