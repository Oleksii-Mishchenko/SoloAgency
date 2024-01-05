import './social-media.scss';
import telegramImage from '../../assets/img/telegram.svg';
import instagramImage from '../../assets/img/instagram.svg';

export const SocialMedia = () => {
  return (
    <div className="social-media">
      <a
        href="https://t.me/solo_agencylviv"
        className="social-media__link"
        target="_blank"
      >
        <img
          src={telegramImage}
          alt="Telegram"
          className="social-media__image"
        />
      </a>

      <a
        href="https://www.instagram.com/solo_agency_/"
        className="social-media__link"
        target="_blank"
      >
        <img
          src={instagramImage}
          alt="Instagram"
          className="social-media__image"
        />
      </a>
    </div>
  );
};
