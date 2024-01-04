import { Article } from '../types/Article';
import { client } from '../utils/axiosClient';

const articlesUrl = 'agency/articles/3';

export const loadArticles = (): Promise<Article[]> => {
  return client.get<Article[]>(articlesUrl);
};
