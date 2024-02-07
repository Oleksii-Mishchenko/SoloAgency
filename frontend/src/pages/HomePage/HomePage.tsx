import './home-page.scss';
import { CallRequest } from '../../components/CallRequest';
import { ReviewsSlider } from '../../components/ReviewsSlider';
import { Hero } from '../../components/Hero';
import { Articles } from '../../components/Articles';
import { ContactUs } from '../../components/ContactUs';
import { AddReview } from '../../components/AddReview';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();
  const contactsRef = useRef<HTMLElement>(null);

  const scrollToContacts = () => {
    contactsRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (location.state === 'contacts') {
      scrollToContacts();
    }
  }, [location.key]);

  return (
    <div className="home-page">
      <Hero relPage="home-page" onCallRequest={scrollToContacts} />

      <Articles relPage="home-page" />

      <section className="home-page__contacts" id="contacts" ref={contactsRef}>
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

      <AddReview relPage="home-page" />
    </div>
  );
};
