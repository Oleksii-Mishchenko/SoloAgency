import { CallRequest } from '../../../types/CallRequestData';
import { OrderItem } from '../../common';
import './cr-order.scss';

type Props = {
  order: CallRequest;
};

export const CROrder: React.FC<Props> = ({
  order: { created_at, city, name, phone, description },
}) => {
  const dateCreated = new Date(Date.parse(created_at)).toLocaleString('uk-UA', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <article className="cr-order">
      <h3 className="cr-order__title">
        <span className="cr-order__date">Створено: {dateCreated}</span>
        Запит на дзвінок
      </h3>

      <ul className="cr-order__content">
        <OrderItem name="Ім'я" value={name} />
        <OrderItem name="Місто" value={city} />
        <OrderItem name="Номер телефону" value={phone} />
        <OrderItem name="Додатковий опис" value={description} />
      </ul>
    </article>
  );
};
