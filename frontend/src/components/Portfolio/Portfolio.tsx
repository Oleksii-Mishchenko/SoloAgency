import { Project as ProjectType } from '../../types/Project';
import { Project } from '../Project';
import './portfolio.scss';

type Props = {
  relPage: string;
};

const projects: ProjectType[] = [
  {
    id: 1,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-13843d24-3911-4276-a037-ea6bcd3a2533.jpg',
  },
  {
    id: 2,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-308b7007-2bc2-46fc-88ae-c8030a45e12c.jpg',
  },
  {
    id: 3,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-7c8b0232-2576-416d-b18e-d65b07edf4c9.jpg',
  },
  {
    id: 4,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-576613e3-169d-40c9-b43a-6e944c3436de.jpg',
  },
  {
    id: 5,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-5078bbc8-0feb-48e9-99ed-d75e8fcf3f4d.jpg',
  },
  {
    id: 6,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-a6ee8472-a4e0-41b8-987c-f96e5132eb5c.jpg',
  },
  {
    id: 7,
    title: 'Весілля Романа і Людмили',
    description:
      "Це чудове святкування весілля Романа і Людмили запам'ятається надовго",
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/-93b158df-0824-487b-b3f6-62b651a8cdd4.jpg',
  },
  {
    id: 8,
    title: 'Roman',
    description: 'the best birthday',
    photo:
      'http://0.0.0.0:8080/media/uploads/portfolio/roman-638c8f6c-3f6b-4fcb-9623-fe4ce2c0bfee.jpeg',
  },
];

export const Portfolio: React.FC<Props> = ({ relPage }) => {
  return (
    <section className={`${relPage}__portfolio portfolio`}>
      <h1 className="portfolio__title">Реалізовані проекти</h1>

      <div className="portfolio__projects">
        {projects.map(project => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
