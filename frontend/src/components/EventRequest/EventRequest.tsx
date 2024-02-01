import { useForm } from 'react-hook-form';
import { TextInput } from '../Inputs';
import './event-request.scss';

type Props = {
  relPage: string;
};

export const EventRequest: React.FC<Props> = ({ relPage }) => {
  const {} = useForm();

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
          <TextInput label="Місто проведення" />
        </fieldset>

        <fieldset className="event-request__fieldset">2</fieldset>
      </form>
    </section>
  );
};
