import React, { useCallback, FC } from 'react';
import { SingleValue } from 'react-select';
import * as callRequestsActions from '../../../features/callRequestSlice';
import { useAppDispatch } from '../../../app/hooks';
import { statusUa } from '../../../assets/libs/translations/statusUa';
import { CallRequest } from '../../../types/CallRequestData';
import { OrderSelect } from '../../UI/inputs/fields';
import { OrderItem } from '../../common';
import { SelectOption } from '../../../types/SelectOption';
import { OrderStatus } from '../../../types/OrderStatus';
import { ServerErrorResponse } from '../../../types/ServerErrorResponse';
import { Notification } from '../../UX';
import './cr-order.scss';

type Props = {
  order: CallRequest;
  errors: ServerErrorResponse | null;
  isChangingStatus: boolean;
};

export const CROrder: FC<Props> = React.memo(
  ({
    order: { id, created_at, city, name, phone, description, status },
    isChangingStatus,
    errors,
  }) => {
    const dispatch = useAppDispatch();

    const dateCreated = new Date(Date.parse(created_at)).toLocaleString(
      'uk-UA',
      {
        dateStyle: 'long',
        timeStyle: 'short',
      },
    );

    const handleStatusChange = useCallback(
      (newValue: SingleValue<SelectOption<OrderStatus>>) => {
        const newStatus = newValue?.value;

        if (newStatus === status) {
          return;
        }

        if (newStatus) {
          dispatch(callRequestsActions.changeStatus({ id, status: newStatus }));
        }
      },
      [status],
    );

    return (
      <article className={`cr-order cr-order--${status}`}>
        <h3 className="cr-order__title">
          <span className="cr-order__date">Створено: {dateCreated}</span>
          Запит на дзвінок
        </h3>

        <ul className="cr-order__content">
          <OrderItem name="Ім'я" value={name} />
          <OrderItem name="Місто" value={city} />
          <OrderItem name="Номер телефону" value={phone} />
          <OrderItem name="Додатковий опис" value={description} />
          <OrderItem name="Статус" value={statusUa[status]} />
          <OrderSelect
            inputLabel="Змінити статус"
            value={status}
            onChange={handleStatusChange}
            isLoading={isChangingStatus}
          />
        </ul>

        {errors && (
          <Notification
            message="Статус не був змінений"
            className="cr-order__notification"
            errors={errors}
            onClose={() => {
              dispatch(callRequestsActions.clearChangeStatusErrors());
            }}
          />
        )}
      </article>
    );
  },
);
