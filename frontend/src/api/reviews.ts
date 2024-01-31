import { Review } from '../types/Review';
import { client } from '../utils/axiosClient';

const reviewsUrl = 'agency/reviews/';

export const loadApprovedReviews = (): Promise<Review[]> => {
  return client.get<Review[]>(`${reviewsUrl}?is_approved=true`);
};
