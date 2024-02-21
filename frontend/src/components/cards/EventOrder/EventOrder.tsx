import { useCallback, FC, memo } from 'react';
import { SingleValue } from 'react-select';
import { useAppDispatch } from '../../../app/hooks';
import * as eventsActions from '../../../features/eventsSlice';
import { Event } from '../../../types/Event';
import { Notification } from '../../UX';
import { OrderItem } from '../../common';
import { statusUa } from '../../../assets/libs/translations/statusUa';
import { OrderSelect } from '../../UI/inputs/fields';
import { prettyPhoneNumber } from '../../../helpers/prettyPhoneNumber';
import { SelectOption } from '../../../types/SelectOption';
import { OrderStatus } from '../../../types/OrderStatus';
import { ServerErrorResponse } from '../../../types/ServerErrorResponse';
import './event-order.scss';

type Props = {
  order: Event;
  isStaff: boolean;
  errors: ServerErrorResponse | null;
  isChangingStatus: boolean;
};

export const EventOrder: FC<Props> = memo(
  ({
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
    errors,
    isChangingStatus,
  }) => {
    const dispatch = useAppDispatch();
    const dateCreated = new Date(Date.parse(created_at)).toLocaleString(
      'uk-UA',
      {
        dateStyle: 'long',
        timeStyle: 'short',
      },
    );
    const eventDate =
      new Date(Date.parse(date)).toLocaleString('uk-UA', {
        dateStyle: 'long',
      }) || null;

    const handleStatusChange = useCallback(
      (newValue: SingleValue<SelectOption<OrderStatus>>) => {
        const newStatus = newValue?.value;

        if (newStatus === status) {
          return;
        }

        if (newStatus) {
          dispatch(eventsActions.changeStatus({ id, status: newStatus }));
        }
      },
      [status],
    );

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
          <OrderItem name="Номер телефону" value={prettyPhoneNumber(phone)} />
          <OrderItem name="Кількість гостей" value={`${number_of_guests}`} />
          <OrderItem name="Стиль події" value={style} />
          <OrderItem name="Коментар" value={description} />
          <OrderItem name="Статус" value={statusUa[status]} />
          {isStaff && (
            <OrderSelect
              inputLabel="Змінити статус"
              value={status}
              onChange={handleStatusChange}
              isLoading={isChangingStatus}
            />
          )}
        </ul>

        {errors && (
          <Notification
            message="Статус не був змінений"
            className="event-order__notification"
            errors={errors}
            onClose={() => {
              dispatch(eventsActions.clearChangeStatusErrors());
            }}
          />
        )}
      </article>
    );
  },
);
