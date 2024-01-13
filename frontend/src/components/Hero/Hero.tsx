import { MainButton } from '../MainButton';
import './hero.scss';

type Props = {
  relPage: string;
};

export const Hero: React.FC<Props> = ({ relPage }) => {
  return (
    <section className={`${relPage}__hero hero`}>
      <div className="hero__content">
        <p className="hero__content-text">
          Організовуємо мрії та перетворюємо їх у реальність - ваші події, наша
          справа!
        </p>

        <MainButton text="Замовити послугу" className="hero__button" />
      </div>

      <div className="hero__banner" />
    </section>
  );
};
