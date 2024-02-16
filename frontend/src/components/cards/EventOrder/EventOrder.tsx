import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as eventsActions from '../../../features/eventsSlice';
import { Event } from '../../../types/Event';
import { Notification } from '../../UX';
import { OrderItem } from '../../common';
import { statusUa } from '../../../assets/libs/translations/statusUa';
import { OrderSelect } from '../../UI/inputs/fields';
import { prettyPhoneNumber } from '../../../helpers/prettyPhoneNumber';
import './event-order.scss';

type Props = {
  order: Event;
  isStaff: boolean;
};

export const EventOrder: React.FC<Props> = ({
  order: {
    id,
    created_at,
    customer,
    city,
    phone,
    description,
    date,
    venue,
    event_type_name,
    number_of_guests,
    style,
    service_name,
    status,
  },
  isStaff,
}) => {
  const dispatch = useAppDispatch();
  const { changeStatusErrors } = useAppSelector(state => state.events);
  const dateCreated = new Date(Date.parse(created_at)).toLocaleString('uk-UA', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  const eventDate =
    new Date(Date.parse(date)).toLocaleString('uk-UA', {
      dateStyle: 'long',
    }) || null;
  const prettyPhone = prettyPhoneNumber(phone);

  return (
    <article className={`event-order event-order--${status}`}>
      <h3 className="event-order__title">
        <span className="event-order__date">Створено: {dateCreated}</span>
        Запит на послугу
      </h3>

      <ul className="event-order__content">
        <OrderItem name="Дата події" value={eventDate} />
        <OrderItem name="Назва послуги" value={service_name} />
        {isStaff && <OrderItem name="Ім'я" value={customer} />}
        <OrderItem name="Місто" value={city} />
        <OrderItem name="Місце проведення" value={venue} />
        <OrderItem name="Тип події" value={event_type_name} />
        <OrderItem name="Номер телефону" value={prettyPhone} />
        <OrderItem
          name="Кількість гостей"
          value={number_of_guests.toString() || null}
        />
        <OrderItem name="Стиль події" value={style} />
        <OrderItem name="Коментар" value={description} />
        <OrderItem name="Статус" value={statusUa[status]} />
        {isStaff && (
          <OrderSelect id={id} inputLabel="Змінити статус" value={status} />
        )}
      </ul>

      {changeStatusErrors && (
        <Notification
          message="Статус не був змінений"
          className="event-order__notification"
          errors={changeStatusErrors}
          onClose={() => {
            dispatch(eventsActions.clearChangeStatusErrors());
          }}
        />
      )}
    </article>
  );
};
