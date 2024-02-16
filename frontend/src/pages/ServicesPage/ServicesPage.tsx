import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AddEventType } from '../../components/sections/forms';
import { EventRequest } from '../../components/sections/forms';
import { EventTypes, Services } from '../../components/sections/common';
import './services-page.scss';

export const ServicesPage = () => {
  const { state } = useLocation();
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const { isLoadingServices } = useAppSelector(state => state.services);
  const { isLoadingEventTypes } = useAppSelector(state => state.eventTypes);
  const orderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (state === 'order') {
      orderRef.current?.scrollIntoView();
    }
  }, [isLoadingServices, isLoadingEventTypes]);

  return (
    <div className="services-page">
      <Services relPage="services-page" />

      <EventTypes relPage="services-page" />

      {token && user?.is_staff && <AddEventType relPage="services-page" />}

      {!user?.is_staff && (
        <EventRequest relPage="services-page" sectionRef={orderRef} />
      )}

      <section className="services-page__info">
        <h2 className="services-page__info-title">Додаткова інформація</h2>

        <p className="services-page__info-description">
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
