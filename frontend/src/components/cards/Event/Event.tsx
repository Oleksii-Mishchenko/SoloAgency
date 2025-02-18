import { useState, FC } from 'react';
import { ControlButtonType } from '../../../types/ControlButtonType';
import { EventType } from '../../../types/EventType';
import { ControlButton } from '../../UI/buttons';
import './event.scss';
import { Confirmation } from '../../UX';

type Props = {
  eventType: EventType;
  isAdmin?: boolean;
  handleRemove: (id: number) => Promise<void>;
  isDeleting: boolean;
  onEdit: (event: EventType) => void;
};

export const Event: FC<Props> = ({
  eventType,
  isAdmin,
  handleRemove,
  isDeleting,
  onEdit,
}) => {
  const { id, photo, name, description } = eventType;
  const [hasDelConfirm, setHasDelConfirm] = useState<boolean>(false);

  return (
    <article className="event">
      <div className="event__image-wrapper">
        <img src={photo} alt={name} className="event__image" />
        <p className="event__description">{description}</p>
      </div>

      <div className="event__info">
        <h3 className="event__title">{name}</h3>

        {isAdmin && (
          <div className="event__controls">
            <ControlButton
              buttonType={ControlButtonType.Edit}
              type="button"
              title="Редагувати"
              onClick={event => {
                event.stopPropagation();
                onEdit(eventType);
              }}
            />

            <ControlButton
              buttonType={ControlButtonType.Remove}
              type="button"
              title="Видалити"
              onClick={event => {
                event.stopPropagation();
                setHasDelConfirm(true);
              }}
            />
          </div>
        )}
      </div>

      {hasDelConfirm && (
        <Confirmation
          className="event__confirmation"
          message="Бажаєте видалити послугу?"
          onReject={() => setHasDelConfirm(false)}
          onConfirm={() => handleRemove(id)}
          isLoading={isDeleting}
        />
      )}
    </article>
  );
};
