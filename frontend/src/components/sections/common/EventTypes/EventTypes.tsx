import { useCallback, useEffect, useState, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Errors, Loader, Notification, Pagination } from '../../../UX';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as eventTypesActions from '../../../../features/eventTypesSlice';
import { getSearchWith } from '../../../../helpers/getSearchWith';
import { LoaderElement } from '../../../../types/LoaderElement';
import { useScrollToRef } from '../../../../customHooks/useScrollToRef';
import { Event } from '../../../cards';
import './event-types.scss';
import { EventType } from '../../../../types/EventType';

type Props = {
  relPage: string;
};

export const EventTypes: FC<Props> = ({ relPage }) => {
  const [editedEvent, setEditedEvent] = useState<EventType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || null;
  const dispatch = useAppDispatch();
  const {
    eventTypes,
    isLoadingEventTypes,
    errors,
    deletingEventTypeId,
    deletedEventTypeId,
    errorsDeleteEventType,
  } = useAppSelector(state => state.eventTypes);
  const { user } = useAppSelector(state => state.user);
  const { num_pages, results } = eventTypes;

  useEffect(() => {
    const timerId = setTimeout(() => {
      const params = getSearchWith({ page }, searchParams);

      dispatch(eventTypesActions.init(params ? `?${params}` : ''));
    }, 300);

    return () => clearTimeout(timerId);
  }, [page]);

  const sectionRef = useScrollToRef([page]);

  const handleRemove = useCallback(async (id: number) => {
    await dispatch(eventTypesActions.remove(id));

    setSearchParams(getSearchWith({ page: null }, searchParams));
  }, []);

  return (
    <section className={`${relPage}__event-types event-types`} ref={sectionRef}>
      <h2 className="event-types__title">Більше послуг</h2>

      {isLoadingEventTypes && (
        <Loader className="event-types__loader" element={LoaderElement.Block} />
      )}

      {!!results.length && !errors && (
        <>
          <div className="event-types__events">
            {results.map(eventType => {
              const isDeleting = deletingEventTypeId === eventType.id;

              return (
                <Event
                  eventType={eventType}
                  key={eventType.id}
                  isAdmin={user?.is_staff}
                  handleRemove={handleRemove}
                  isDeleting={isDeleting}
                  onEdit={setEditedEvent}
                />
              );
            })}
          </div>

          {num_pages > 1 && <Pagination config={eventTypes} />}
        </>
      )}

      {editedEvent && 123}

      {errors && <Errors className="event-types__errors" errors={errors} />}

      {deletedEventTypeId && (
        <Notification
          className="event-types__notification"
          message="Послуга успішно видалена"
          onClose={() => dispatch(eventTypesActions.clearDeletedId())}
        />
      )}

      {errorsDeleteEventType && (
        <Notification
          className="event-types__notification"
          message="Послуга не видалена"
          errors={errorsDeleteEventType}
          onClose={() => dispatch(eventTypesActions.clearErrorsDelete())}
        />
      )}
    </section>
  );
};
