import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as callRequestsActions from '../../../../features/callRequestSlice';
import * as eventsActions from '../../../../features/eventsSlice';
import { OrderType } from '../../../../types/OrderType';
import './orders.scss';

export const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { callRequests, areLoading, callRequestsErrors } = useAppSelector(
    state => state.callRequest,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  console.log(callRequests, areLoading, callRequestsErrors);

  useEffect(() => {
    switch (type) {
      case OrderType.CallRequest:
        dispatch(callRequestsActions.init());
        break;
      case OrderType.Event:
        dispatch(eventsActions.init());
        break;
      default:
    }
  }, []);

  return <div className="orders">Orders</div>;
};
