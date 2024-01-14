import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination';
import './event-types.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as eventTypesActions from '../../features/eventTypesSlice';
import { useEffect } from 'react';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Errors } from '../Errors';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';

type Props = {
  relPage: string;
};

export const EventTypes: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const dispatch = useAppDispatch();
  const {
    eventTypes: { num_pages, current_page, next_page, previous_page, results },
    isLoadingEventTypes,
    errors,
  } = useAppSelector(state => state.eventTypes);

  useEffect(() => {
    const params = getSearchWith({ page }, searchParams);

    dispatch(eventTypesActions.init(`?${params}`));
  }, [dispatch, page, searchParams]);

  return (
    <section className={`${relPage}__event-types event-types`}>
      {isLoadingEventTypes && (
        <Loader className="event-types__loader" element={LoaderElement.Block} />
      )}

      {!!results.length && !errors && (
        <>
          {results.map(({ id, photo, name, description }) => (
            <article className="event-types__event" key={id}>
              <div className="event-types__event-image-wrapper">
                <img
                  src={photo}
                  alt={name}
                  className="event-types__event-image"
                />
                <p className="event-types__event-description">{description}</p>
              </div>

              <h3 className="event-types__event-title">{name}</h3>
            </article>
          ))}

          {num_pages > 1 && (
            <Pagination
              className="event-types__pagination"
              config={{ num_pages, current_page, next_page, previous_page }}
            />
          )}
        </>
      )}

      {errors && <Errors className="event-types__errors" errors={errors} />}
    </section>
  );
};
