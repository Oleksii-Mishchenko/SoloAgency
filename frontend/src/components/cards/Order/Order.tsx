import { CallRequest } from '../../../types/CallRequestData';
import { Event } from '../../../types/Event';
import { OrderType } from '../../../types/OrderType';
import './order.scss';

type EventConfig = {
  type: OrderType.Event;
  order: Event;
};
type CRConfig = {
  type: OrderType.CallRequest;
  order: CallRequest;
};

type Props = {
  config: EventConfig | CRConfig;
};

export const Order: React.FC<Props> = ({
  cr: { city, created_at, description, name, phone },
}) => {
  const date = new Date(Date.parse(created_at)).toLocaleString('uk-UA', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <article className="order">
      <h3 className="order__title">
        <span className="order__date">Створено: {date}</span>
        Запит на дзвінок
      </h3>

      <ul className="order__content">
        <li className="order__item">
          <span className="order__item-name">Ім'я: </span>
          {name}
        </li>

        <li className="c-r-card__item">
          <span className="c-r-card__item-name">Місто: </span>
          {city || (
            <span className="c-r-card__item-empty">Місто не вказано</span>
          )}
        </li>

        <li className="c-r-card__item">
          <span className="c-r-card__item-name">Номер телефону: </span>
          {phone}
        </li>

        <li className="c-r-card__item">
          <span className="c-r-card__item-name">Додатковий опис: </span>
          {description || (
            <span className="c-r-card__item-empty">Опис не надано</span>
          )}
        </li>
      </ul>
    </article>
  );
};
