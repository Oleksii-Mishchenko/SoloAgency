import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as articlesActions from '../../../../features/articlesSlice';
import { LoaderElement } from '../../../../types/LoaderElement';
import { Errors, Loader } from '../../../UX';
import './articles.scss';

type Props = {
  relPage: string;
};

export const Articles: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { articles, isLoadingArticles, errors } = useAppSelector(
    state => state.articles,
  );

  useEffect(() => {
    dispatch(articlesActions.init());
  }, [dispatch]);

  return (
    <section className={`${relPage}__articles articles`}>
      {isLoadingArticles && (
        <Loader element={LoaderElement.Block} className="articles__loader" />
      )}

      {!!articles.length &&
        !errors &&
        articles.map(({ id, title, content }) => (
          <article key={id} className="articles__article">
            <h1 className="articles__article-title">{title}</h1>

            <p className="articles__article-content">{content}</p>
          </article>
        ))}

      {errors && <Errors errors={errors} />}
    </section>
  );
};
