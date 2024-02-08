import { MainButton } from '../UI/buttons/MainButton';
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
          Організовуємо мрії та перетворюємо їх у реальність - ваші події, наша
          справа!
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
