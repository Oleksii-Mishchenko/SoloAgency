import './home-page.scss';
import { CallRequest } from '../../components/CallRequest';
import { ReviewsSlider } from '../../components/ReviewsSlider';
import { Hero } from '../../components/Hero';
import { Articles } from '../../components/Articles';
import { ContactUs } from '../../components/ContactUs';

export const HomePage = () => {
  return (
    <div className="home-page">
      <Hero relPage="home-page" />

      <Articles relPage="home-page" />

      <section className="home-page__contacts">
        <h1 className="home-page__contacts-title">Наші контакти</h1>

        <div className="home-page__contacts-content">
          <CallRequest relPage="home-page" />

          <ContactUs relPage="home-page" />
        </div>
      </section>

      <section className="home-page__reviews">
        <h1 className="home-page__reviews-title">Що говорять про нас?</h1>

        <ReviewsSlider />
      </section>
    </div>
  );
};
