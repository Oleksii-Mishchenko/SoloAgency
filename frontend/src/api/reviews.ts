import { NewReview, Review } from '../types/Review';
import { client } from '../utils/axiosClient';

const reviewsUrl = 'agency/reviews/';

export const loadApprovedReviews = (): Promise<Review[]> => {
  return client.get<Review[]>(`${reviewsUrl}?is_approved=true`);
};

export const loadAllReviews = (): Promise<Review[]> => {
  return client.get<Review[]>(reviewsUrl);
};

export const approveReview = (id: number): Promise<Review> => {
  const approveData: Pick<Review, 'is_approved'> = { is_approved: true };
  return client.patch<Review, Partial<Review>>(
    `${reviewsUrl}${id}/`,
    approveData,
  );
};

export const deleteReview = (id: number): Promise<number> => {
  return client.delete<number>(`${reviewsUrl}${id}`);
};

export const addReview = (data: NewReview): Promise<Review> => {
  return client.post<Review, NewReview>(reviewsUrl, data);
};
