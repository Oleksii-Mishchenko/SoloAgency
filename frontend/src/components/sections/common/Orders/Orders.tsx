import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
import { CROrder, EventOrder } from '../../../cards';
import './orders.scss';

type Props = {
  relPage: string;
};

export const Orders: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const page = searchParams.get('page');
  const [activeOrder, setActiveOrder] = useState<OrderType | null>(null);
  const dispatch = useAppDispatch();
  const {
    callRequests,
    areCRLoading,
    callRequestsErrors,
    changeCRStatusId,
    changeCRStatusErrorId,
    changeCRStatusErrors,
  } = useAppSelector(state => state.callRequest);
  const {
    events,
    areEventsLoading,
    eventsErrors,
    changeEventStatusId,
    changeEventStatusErrors,
    changeEventStatusErrorId,
  } = useAppSelector(state => state.events);
  const { user } = useAppSelector(state => state.user);
  const { token } = useAppSelector(state => state.auth);
  const areCRsVisible = activeOrder === OrderType.CallRequest && !areCRLoading;
  const areEventsVisible = activeOrder === OrderType.Event && !areEventsLoading;

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

  const sectionRef = useScrollToRef([
    callRequests.current_page,
    events.current_page,
  ]);

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

            {areCRsVisible && !!callRequests.results.length && (
              <>
                {callRequests.results.map(callRequest => {
                  return (
                    <CROrder
                      order={callRequest}
                      key={callRequest.id}
                      errors={
                        changeCRStatusErrorId === callRequest.id
                          ? changeCRStatusErrors
                          : null
                      }
                      isChangingStatus={callRequest.id === changeCRStatusId}
                    />
                  );
                })}

                {callRequests.num_pages > 1 && (
                  <Pagination config={callRequests} />
                )}
              </>
            )}

            {areCRsVisible && callRequestsErrors && (
              <Errors className="orders__errors" errors={callRequestsErrors} />
            )}

            {areEventsVisible && !!events.results.length && (
              <>
                {events.results.map(event => {
                  return (
                    <EventOrder
                      order={event}
                      key={event.id}
                      isStaff={user.is_staff}
                      errors={
                        changeEventStatusErrorId === event.id
                          ? changeEventStatusErrors
                          : null
                      }
                      isChangingStatus={event.id === changeEventStatusId}
                    />
                  );
                })}

                {events.num_pages > 1 && <Pagination config={events} />}
              </>
            )}

            {areEventsVisible && !events.results.length && !eventsErrors && (
              <div className="orders__no-orders">
                <h3 className="orders__no-orders-title">
                  У Вас немає замовлених подій
                </h3>

                <p className="orders__no-orders-message">
                  Ви можете замовити подію на сторінці з{' '}
                  <Link
                    className="orders__no-orders-link"
                    to="/services"
                    state="order"
                  >
                    послугами
                  </Link>
                  .
                </p>
              </div>
            )}

            {areEventsVisible && eventsErrors && (
              <Errors className="orders__errors" errors={eventsErrors} />
            )}
          </div>
        </>
      )}
    </section>
  );
};
