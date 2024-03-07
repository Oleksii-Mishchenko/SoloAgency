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

        <p className="contact-us__contact-value">+38 (063) 028 28 13</p>
        <p className="contact-us__contact-value">+38 (093) 816 16 54</p>
      </div>

      <div className="contact-us__contact">
        <p className="contact-us__contact-name">Електронна адреса</p>

        <p className="contact-us__contact-value">soloagency2000@gmail.com</p>
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
