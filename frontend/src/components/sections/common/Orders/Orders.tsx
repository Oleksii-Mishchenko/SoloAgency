import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as callRequestsActions from '../../../../features/callRequestSlice';
import * as eventsActions from '../../../../features/eventsSlice';
import { OrderType } from '../../../../types/OrderType';
import './orders.scss';

type Props = {
  relPage: string;
};

export const Orders: React.FC<Props> = ({ relPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [activeOrder, setActiveOrder] = useState<OrderType | null>(null);
  const dispatch = useAppDispatch();
  const { callRequests, areCRLoading, callRequestsErrors } = useAppSelector(
    state => state.callRequest,
  );
  const { events, areEventsLoading, eventsErrors } = useAppSelector(
    state => state.events,
  );
  const { user } = useAppSelector(state => state.user);
  const { token } = useAppSelector(state => state.auth);

  console.log(activeOrder);

  useEffect(() => {
    if (user && token) {
      switch (type) {
        case OrderType.CallRequest:
          setActiveOrder(OrderType.CallRequest);
          dispatch(callRequestsActions.init());
          break;

        case OrderType.Event:
        default:
          setActiveOrder(OrderType.Event);
          dispatch(eventsActions.init());
          break;
      }
    }
  }, [type, user, token]);

  return (
    <section className={`${relPage}__orders orders`}>
      <h2 className="orders__title">Title</h2>

      {activeOrder}
    </section>
  );
};
