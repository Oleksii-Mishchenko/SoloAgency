import { Project as ProjectType } from '../../types/Project';
import './project.scss';

type Props = {
  project: ProjectType;
};

export const Project: React.FC<Props> = ({
  project: { photo, title, description },
}) => {
  return (
    <article className="project">
      <div className="project__visual">
        <img src={photo} alt="Project" className="project__image" />
      </div>

      <div className="project__info">
        <h3 className="project__info-title">{title}</h3>

        <p className="project__info-description">{description}</p>
      </div>
    </article>
  );
};
