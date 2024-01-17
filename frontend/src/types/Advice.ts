import { PaginationConfig } from './PaginationConfig';

export interface Advice {
  id: number;
  question: string;
  answer: string;
  priority: 1 | 2 | 3 | 4 | 5;
}

export interface NewAdvice extends Omit<Advice, 'id'> {}

export interface Advices extends PaginationConfig {
  results: Advice[];
}
