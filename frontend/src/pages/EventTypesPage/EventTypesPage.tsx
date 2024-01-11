import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EventType } from '../../components/EventType';
import * as eventTypesActions from '../../features/eventTypesSlice';
import './event-types-page.scss';
import { Loader } from '../../components/Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { Errors } from '../../components/Errors';

export const EventTypesPage = () => {
  const dispatch = useAppDispatch();
  const { eventTypes, isLoadingEventTypes, errors } = useAppSelector(
    state => state.eventTypes,
  );

  useEffect(() => {
    dispatch(eventTypesActions.init());
  }, [dispatch]);

  return (
    <div className="event-types-page">
      <h2 className="event-types-page__title">Послуги</h2>

      {isLoadingEventTypes && (
        <Loader
          className="event-types-page__loader"
          element={LoaderElement.Block}
        />
      )}

      {!!eventTypes.length && !errors && (
        <section className="event-types-page__events">
          {eventTypes.map(eventType => (
            <EventType eventType={eventType} key={eventType.id} />
          ))}
        </section>
      )}

      {errors && <Errors className="event-types-page__error" errors={errors} />}

      <section className="event-types-page__info">
        <h2 className="event-types-page__info-title">Додаткова інформація</h2>

        <p className="event-types-page__info-description">
          Наша агенція пишається своїм висококваліфікованим персоналом, який
          володіє не тільки глибоким розумінням організації різноманітних
          заходів, але й створює атмосферу теплоти та професіоналізму для
          кожного клієнта. Наші творчі організатори завжди в пошуку новаторських
          ідей і готові пристосовуватися до будь-яких вимог, надаючи
          персоналізовані рішення.
          <br />
          <br />
          Для досягнення максимального рівня задоволення клієнтів ми встановили
          тісні партнерські відносини з рядом високопрофесійних підрядників. Це
          включає в себе кращих кейтерингових фахівців, талановитих декораторів
          та аудіо-відео експертів. Наші партнери ділять нашу відданість якості
          і креативності, готові спільно працювати для забезпечення
          неперевершеного досвіду наших клієнтів.
        </p>
      </section>
    </div>
  );
};
