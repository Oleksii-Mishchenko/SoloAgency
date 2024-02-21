import React, { FC } from 'react';
import classNames from 'classnames';
import './order-item.scss';

type Props = {
  name: string;
  value?: string | null;
};

export const OrderItem: FC<Props> = React.memo(({ name, value }) => {
  return (
    <li className="order-item">
      <p className="order-item__name">{`${name}:`}</p>

      <p
        className={classNames('order-item__value', {
          'order-item__value--empty': !value,
        })}
      >
        {value || 'Не зазначено'}
      </p>
    </li>
  );
});
