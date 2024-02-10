import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as advicesActions from '../../../../features/advicesSlice';
import { Errors, Loader, Pagination, Notification } from '../../../UX';
import { LoaderElement } from '../../../../types/LoaderElement';
import { AdviceAccordion } from '../../../cards';
import { getSearchWith } from '../../../../helpers/getSearchWith';
import { useScrollToRef } from '../../../../customHooks/useScrollToRef';
import './advices.scss';

type Props = {
  relPage: string;
};

export const Advices: React.FC<Props> = ({ relPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || null;
  const dispatch = useAppDispatch();
  const {
    advices,
    isLoadingAdvices,
    errorsLoading,
    isPatchedAdvice,
    deletingAdviceId,
    deletedAdviceId,
    errorsDelete,
    errorsPatch,
  } = useAppSelector(state => state.advices);
  const { num_pages, results } = advices;

  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (expandedId) {
      setExpandedId(null);
    }

    const timerId = setTimeout(() => {
      const params = getSearchWith({ page }, searchParams);

      dispatch(advicesActions.init(params ? `?${params}` : ''));
    }, 300);

    return () => clearTimeout(timerId);
  }, [page, results.length]);

  const sectionRef = useScrollToRef([page]);

  const handleRemove = useCallback(async (id: number) => {
    await dispatch(advicesActions.remove(id));

    setSearchParams(getSearchWith({ page: null }, searchParams));
  }, []);

  return (
    <section className={`${relPage}__advices advices`} ref={sectionRef}>
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
            const isExpanded = advice.id === expandedId;
            const isDeleting = deletingAdviceId === advice.id;

            return (
              <AdviceAccordion
                key={advice.id}
                className="advices__advice"
                advice={advice}
                isExpanded={isExpanded}
                setExpandedId={setExpandedId}
                handleRemove={handleRemove}
                isDeleting={isDeleting}
              />
            );
          })}
      </div>

      {num_pages > 1 && <Pagination config={advices} />}

      {deletedAdviceId && (
        <Notification
          className="advices__notification"
          message="Питання і відповідь успішно видалені"
          onClose={() => dispatch(advicesActions.clearDeletedId())}
        />
      )}

      {errorsDelete && (
        <Notification
          className="advices__notification"
          message="Питання і відповідь не видалені"
          errors={errorsDelete}
          onClose={() => dispatch(advicesActions.clearErrorsDelete())}
        />
      )}

      {isPatchedAdvice && (
        <Notification
          className="advices__notification"
          message="Питання і відповідь були успішно змінені"
          onClose={() => dispatch(advicesActions.clearIsPatched())}
        />
      )}

      {errorsPatch && (
        <Notification
          className="advices__notification"
          message="Питання і відповідь не були змінені"
          errors={errorsPatch}
          onClose={() => dispatch(advicesActions.clearErrorsPatch())}
        />
      )}
    </section>
  );
};
