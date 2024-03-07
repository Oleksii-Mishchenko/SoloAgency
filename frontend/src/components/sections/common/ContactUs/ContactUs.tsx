import { SocialMedia } from '../../../UX';
import './contact-us.scss';

type Props = {
  relPage: string;
};

export const ContactUs: React.FC<Props> = ({ relPage }) => {
  return (
    <article className={`${relPage}__contact-us contact-us`}>
      <div className="contact-us__contact">
        <p className="contact-us__contact-name">Контактні номери телефонів</p>

        <a href="tel:+380630282813" className="contact-us__contact-value">
          +38 (063) 028 28 13
        </a>

        <a href="tel:+380938161654" className="contact-us__contact-value">
          +38 (093) 816 16 54
        </a>
      </div>

      <div className="contact-us__contact">
        <p className="contact-us__contact-name">Електронна адреса</p>

        <a
          href="mailto:soloagency2000@gmail.com"
          className="contact-us__contact-value"
        >
          soloagency2000@gmail.com
        </a>
      </div>

      <div className="contact-us__contact">
        <p
          className="
          contact-us__contact-name
          contact-us__contact-name--social
        "
        >
          Шукайте нас також в соціальних мережах:
        </p>

        <SocialMedia />
      </div>
    </article>
  );
};
