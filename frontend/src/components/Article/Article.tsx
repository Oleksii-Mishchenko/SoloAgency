import React from 'react';
import { Article as ArticleType } from '../../types/Article';
import './article.scss';

type Props = {
  article: ArticleType;
  className: string;
};

export const Article: React.FC<Props> = ({ article, className }) => {
  const { title, content } = article;

  return (
    <article className={`${className} article`}>
      <h1 className="article__title">{title}</h1>

      <p className="article__content">{content}</p>
    </article>
  );
};
