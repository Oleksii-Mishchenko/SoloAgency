import { PaginationConfig } from './PaginationConfig';
import { RatingType } from './Rating';

export interface Advice {
  id: number;
  question: string;
  answer: string;
  priority: RatingType;
}

export interface NewAdvice extends Omit<Advice, 'id'> {}

export interface Advices extends PaginationConfig {
  results: Advice[];
}
