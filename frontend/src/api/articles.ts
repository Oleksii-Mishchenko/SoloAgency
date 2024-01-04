import { Article } from '../types/Article';
import { client } from '../utils/axiosClient';

const articlesUrl = 'agency/articles';

export const loadArticles = (): Promise<Article[]> => {
  return client.get<Article[]>(articlesUrl);
};
