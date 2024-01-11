import { EventType } from '../../components/EventType';
import { EventType as EventVariant } from '../../types/EventType';
import './event-types-page.scss';

const eventTypes: EventVariant[] = [
  {
    id: 1,
    name: 'День народження',
    description: 'Short description',
    photo: 'https://placehold.co/300x150',
  },
  {
    id: 2,
    name: 'Весілля',
    description: 'Long long description',
    photo: 'https://placehold.co/500x200',
  },
  {
    id: 3,
    name: 'Вечірка',
    description: 'Long long long description',
    photo: 'https://placehold.co/500x450',
  },
  {
    id: 4,
    name: 'Заручини',
    description: 'Long long long long description',
    photo: 'https://placehold.co/300x450',
  },
  {
    id: 5,
    name: 'Корпоратив',
    description: 'Very long long long long long long long long description',
    photo: 'https://placehold.co/500x600',
  },
];

export const EventTypesPage = () => {
  return (
    <div className="event-types-page">
      <h2 className="event-types-page__title">Послуги</h2>

      <section className="event-types-page__events">
        {eventTypes.map(eventType => (
          <EventType eventType={eventType} key={eventType.id} />
        ))}
      </section>

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
