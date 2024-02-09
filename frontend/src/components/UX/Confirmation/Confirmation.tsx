import { useRef } from 'react';
import { MainButton } from '../../UI/buttons';
import { useOuterClick } from '../../../customHooks/useOuterClick';
import './confirmation.scss';

type Props = {
  className: string;
  message: string;
  onReject: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
};

export const Confirmation: React.FC<Props> = ({
  className,
  message,
  onReject,
  onConfirm,
  isLoading,
}) => {
  const confirmationRef = useRef<HTMLDivElement>(null);

  useOuterClick(confirmationRef, onReject);

  const handleConfirm = async () => {
    await onConfirm();
    onReject();
  };

  return (
    <div ref={confirmationRef} className={`${className} confirmation`}>
      <p className="confirmation__message">{message}</p>

      <div className="confirmation__buttons">
        <MainButton
          className="confirmation__button"
          text="Так"
          white
          isLoading={isLoading}
          onClick={handleConfirm}
        />

        <MainButton
          className="confirmation__button"
          text="Ні"
          onClick={onReject}
        />
      </div>
    </div>
  );
};
