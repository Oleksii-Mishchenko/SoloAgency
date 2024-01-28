import { Service } from '../../types/Service';
import './services.scss';

type Props = {
  relPage: string;
};

const services: Service[] = [
  {
    id: 1,
    name: 'Організація події',
    description:
      "Це творчий та стратегічний процес, що включає в себе планування, координацію та виконання різноманітних заходів або виступів з метою створення неповторного досвіду для учасників, що надовго запам'ятається.",
  },
  {
    id: 2,
    name: 'Координація події',
    description:
      'Це управління та вирішення деталей для забезпечення гармонійного виконання заходу. Вона включає планування, співпрацю з усіма сторонами та забезпечення, щоб кожен елемент події допомагав досягненню поставленої мети та вражав учасників.',
  },
];

export const Services: React.FC<Props> = ({ relPage }) => {
  return (
    <section className={`${relPage}__services services`}>
      <h1 className="services__title">Наші послуги</h1>

      <div className="services__services">
        {services.map(({ id, name, description }, i) => (
          <article className="services__service" key={id}>
            <h2 className="services__service-title">{`0${i + 1} ${name} -`}</h2>

            <p className="services__service-description">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
