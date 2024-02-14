import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as callRequestsActions from '../../../../features/callRequestSlice';
import * as eventsActions from '../../../../features/eventsSlice';
import { getSearchWith } from '../../../../helpers/getSearchWith';
import { OrderType } from '../../../../types/OrderType';
import { useScrollToRef } from '../../../../customHooks/useScrollToRef';
import {
  Errors,
  Loader,
  Pagination,
  Tabs,
  UnauthorizedMessage,
} from '../../../UX';
import { orderTabs } from '../../../../assets/libs/tabs/orders';
import { LoaderElement } from '../../../../types/LoaderElement';
import './orders.scss';
import { Order } from '../../../cards';

type Props = {
  relPage: string;
};

export const Orders: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const page = searchParams.get('page');
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
  const areCRsVisible =
    activeOrder === OrderType.CallRequest &&
    !areCRLoading &&
    !!callRequests.results.length;
  const areEventsVisible =
    activeOrder === OrderType.Event &&
    !areEventsLoading &&
    !!events.results.length;

  useEffect(() => {
    const params = getSearchWith({ page }, searchParams);

    if (user && token) {
      switch (type) {
        case OrderType.CallRequest:
          setActiveOrder(OrderType.CallRequest);
          dispatch(callRequestsActions.init(params ? `?${params}` : ''));
          break;

        case OrderType.Event:
        default:
          setActiveOrder(OrderType.Event);
          dispatch(eventsActions.init(params ? `?${params}` : ''));
          break;
      }
    }
  }, [type, page, user, token]);

  const sectionRef = useScrollToRef([callRequests.current_page]);

  console.log(events);

  return (
    <section className={`${relPage}__orders orders`} ref={sectionRef}>
      <h2 className="orders__title">Замовлення</h2>

      {!token && (
        <UnauthorizedMessage
          warning={
            'Замовлення можуть переглядати тільки зареєстровані користувачі.'
          }
        />
      )}

      {token && user && activeOrder && (
        <>
          <Tabs
            tabs={
              user.is_staff
                ? orderTabs
                : { [OrderType.Event]: orderTabs[OrderType.Event] }
            }
            activeTab={activeOrder}
          />

          <div className="orders__content">
            {(areCRLoading || areEventsLoading) && (
              <Loader
                className="orders__loader"
                element={LoaderElement.Block}
              />
            )}

            {eventsErrors && (
              <Errors className="orders__errors" errors={eventsErrors} />
            )}

            {callRequestsErrors && (
              <Errors className="orders__errors" errors={callRequestsErrors} />
            )}

            {/* {(activeOrder === OrderType.Event && events && !areEventsLoading) && 123} */}

            {areCRsVisible && (
              <>
                {callRequests.results.map(callRequest => {
                  return (
                    <Order
                      config={{
                        type: OrderType.CallRequest,
                        order: callRequest,
                      }}
                      key={callRequest.id}
                    />
                  );
                })}

                {callRequests.num_pages > 1 && (
                  <Pagination config={callRequests} />
                )}
              </>
            )}

            {areEventsVisible && (
              <>
                {events.results.map(event => {
                  return (
                    <Order
                      config={{
                        type: OrderType.Event,
                        order: event,
                      }}
                      key={event.id}
                    />
                  );
                })}

                {events.num_pages > 1 && <Pagination config={events} />}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};
