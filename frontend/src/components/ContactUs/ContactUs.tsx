import { SocialMedia } from '../SocialMedia';
import './contact-us.scss';

type Props = {
  relPage: string;
};

export const ContactUs: React.FC<Props> = ({ relPage }) => {
  return (
    <div className={`${relPage}__contact-us contact-us`}>
      <div className="contact-us__contact">
        <p className="contact-us__contact-name">Номер телефону</p>

        <p className="contact-us__contact-value">+380222222222</p>
      </div>

      <div className="contact-us__contact">
        <p className="contact-us__contact-name">Електронна адреса</p>

        <p className="contact-us__contact-value">soloagency@gmail.com</p>
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
    </div>
  );
};
