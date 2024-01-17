import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as advicesActions from '../../features/advicesSlice';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { AdviceAccordion } from '../AdviceAccordion';
import './advices.scss';

type Props = {
  relPage: string;
};

export const Advices: React.FC<Props> = ({ relPage }) => {
  const [openedId, setOpenedId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const {
    advices: { results },
    errors,
    isLoadingAdvices,
  } = useAppSelector(state => state.advices);

  useEffect(() => {
    dispatch(advicesActions.init());
  }, [dispatch]);

  // const handleRemove = (id: number) => {
  //   dispatch(advicesActions.remove(id));
  // };

  return (
    <section className={`${relPage}__advices advices`}>
      <h1 className="advices__title">Найпоширеніші питання</h1>

      <div className="advices__wrapper">
        {isLoadingAdvices && (
          <Loader className="advices__loader" element={LoaderElement.Block} />
        )}

        {!!results.length &&
          !errors &&
          results.map(advice => {
            const isOpen = advice.id === openedId;

            return (
              <AdviceAccordion
                key={advice.id}
                className="advices__advice"
                advice={advice}
                isOpen={isOpen}
                setOpenedId={setOpenedId}
              />
            );
          })}
      </div>
    </section>
  );
};
