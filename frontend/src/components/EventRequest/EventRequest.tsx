// import { Input } from '../Input';
import './event-request.scss';

type Props = {
  relPage: string;
};

export const EventRequest: React.FC<Props> = ({ relPage }) => {
  return (
    <section className={`${relPage}__event-request event-request`}>
      <div className="event-request__header">
        <h2 className="event-request__title">
          Бажаєте замовити організацію події?
        </h2>

        <p className="event-request__info">
          Заповніть форму нижче і ми зв'яжемось з вами!
        </p>
      </div>

      <form className="event-request__form">
        <fieldset className="event-request__fieldset">
          {/* <Input label="Місто проведення" /> */}
        </fieldset>

        <fieldset className="event-request__fieldset">2</fieldset>
      </form>
    </section>
  );
};
