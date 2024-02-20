import { MainButton } from '../../../UI/buttons';
import './hero.scss';

type Props = {
  relPage: string;
  onCallRequest: () => void;
};

export const Hero: React.FC<Props> = ({ relPage, onCallRequest }) => {
  return (
    <section className={`${relPage}__hero hero`}>
      <div className="hero__content">
        <p className="hero__content-text">
          Організовуємо так, як в мріях. <br /> Створюємо серцем 🤍
        </p>

        <MainButton
          text="Замовити послугу"
          className="hero__button"
          onClick={onCallRequest}
        />
      </div>

      <div className="hero__banner" />
    </section>
  );
};
