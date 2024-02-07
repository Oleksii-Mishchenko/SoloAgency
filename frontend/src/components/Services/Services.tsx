import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as servicesActions from '../../features/servicesSlice';
import './services.scss';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { Errors } from '../Errors';
import { FileLink } from '../FileLink';

type Props = {
  relPage: string;
};

export const Services: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { services, isLoadingServices, errors } = useAppSelector(
    state => state.services,
  );

  useEffect(() => {
    dispatch(servicesActions.init());
  }, []);

  return (
    <section className={`${relPage}__services services`}>
      <h1 className="services__title">Наші послуги</h1>

      {isLoadingServices && (
        <Loader element={LoaderElement.Block} className="services__loader" />
      )}

      {!!services?.length && !errors && (
        <div className="services__services">
          {services.map(({ id, name, description, presentation }, i) => (
            <article className="services__service" key={id}>
              <h2 className="services__service-title">{`0${i + 1} ${name} -`}</h2>

              <p className="services__service-description">{description}</p>

              <FileLink
                title="Детальніше про послугу"
                filePath={presentation}
                className="services__service-file-link"
              />
            </article>
          ))}
        </div>
      )}

      {errors && <Errors className="services__errors" errors={errors} />}
    </section>
  );
};
