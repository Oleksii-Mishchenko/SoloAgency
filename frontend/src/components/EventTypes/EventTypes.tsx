import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as eventTypesActions from '../../features/eventTypesSlice';
import { useEffect } from 'react';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Errors } from '../Errors';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import './event-types.scss';
import { useScrollToRef } from '../../customHooks/useScrollToRef';

type Props = {
  relPage: string;
};

export const EventTypes: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || null;
  const dispatch = useAppDispatch();
  const {
    eventTypes: { num_pages, current_page, next_page, previous_page, results },
    isLoadingEventTypes,
    errors,
  } = useAppSelector(state => state.eventTypes);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const params = getSearchWith({ page }, searchParams);

      dispatch(eventTypesActions.init(params ? `?${params}` : ''));
    }, 300);

    return () => clearTimeout(timerId);
  }, [page]);

  const sectionRef = useScrollToRef([page]);

  return (
    <section className={`${relPage}__event-types event-types`} ref={sectionRef}>
      <h2 className="event-types__title">Більше послуг</h2>

      {isLoadingEventTypes && (
        <Loader className="event-types__loader" element={LoaderElement.Block} />
      )}

      {!!results.length && !errors && (
        <>
          <div className="event-types__events">
            {results.map(({ id, photo, name, description }) => (
              <article className="event-types__event" key={id}>
                <div className="event-types__event-image-wrapper">
                  <img
                    src={photo}
                    alt={name}
                    className="event-types__event-image"
                  />
                  <p className="event-types__event-description">
                    {description}
                  </p>
                </div>

                <h3 className="event-types__event-title">{name}</h3>
              </article>
            ))}
          </div>

          {num_pages > 1 && (
            <Pagination
              config={{ num_pages, current_page, next_page, previous_page }}
            />
          )}
        </>
      )}

      {errors && <Errors className="event-types__errors" errors={errors} />}
    </section>
  );
};
