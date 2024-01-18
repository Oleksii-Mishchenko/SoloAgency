import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as advicesActions from '../../features/advicesSlice';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { AdviceAccordion } from '../AdviceAccordion';
import './advices.scss';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';
import { Errors } from '../Errors';

type Props = {
  relPage: string;
};

export const Advices: React.FC<Props> = ({ relPage }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const [openedId, setOpenedId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const {
    advices: { num_pages, current_page, next_page, previous_page, results },
    errorsLoading,
    isLoadingAdvices,
  } = useAppSelector(state => state.advices);

  useEffect(() => {
    const params = getSearchWith({ page }, searchParams);

    dispatch(advicesActions.init(`?${params}`));
  }, [dispatch, searchParams, page]);

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

        {errorsLoading && (
          <Errors className="advices__errors" errors={errorsLoading} />
        )}

        {!!results.length &&
          !errorsLoading &&
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

      {num_pages > 1 && (
        <Pagination
          config={{ num_pages, current_page, next_page, previous_page }}
        />
      )}
    </section>
  );
};
