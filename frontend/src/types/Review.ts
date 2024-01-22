import { RatingType } from './Rating';

export interface Review {
  id: number;
  user: number;
  user_name: string;
  text: string;
  rating: RatingType;
  is_approved: boolean;
}
