import { EventType as EventVariant } from '../../types/EventType';
import './event-type.scss';

type Props = {
  eventType: EventVariant;
};

export const EventType: React.FC<Props> = ({
  eventType: { name, photo, description },
}) => {
  return (
    <article className="event-type">
      <div className="event-type__image-wrapper">
        <img src={photo} alt={name} className="event-type__image" />
        <p className="event-type__description">{description}</p>
      </div>

      <h3 className="event-type__title">{name}</h3>
    </article>
  );
};
