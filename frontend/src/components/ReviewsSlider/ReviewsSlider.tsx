import React, { useEffect, useState } from 'react';
import './reviews-slider.scss';
import { Review } from '../Review';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as reviewsActions from '../../features/reviewsSlice';
import { Errors } from '../Errors';

export const ReviewsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { reviews, isLoading, errors } = useAppSelector(state => state.reviews);

  useEffect(() => {
    dispatch(reviewsActions.init());
  }, [dispatch]);

  return (
    <div className="reviews-slider">
      {isLoading && (
        <Loader
          element={LoaderElement.Block}
          className="reviews-slider__loader"
        />
      )}

      {!!reviews.length && !errors && (
        <>
          <div className="reviews-slider__screen">
            <div
              className="reviews-slider__film"
              style={{
                transform: `translateX(calc(-${currentIndex * 50}% - ${
                  currentIndex * 10
                }px))`,
              }}
            >
              {reviews.map(review => (
                <Review review={review} key={review.id} />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="reviews-slider__button reviews-slider__button--left"
            onClick={() => setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex <= 0}
          />

          <button
            type="button"
            className="reviews-slider__button reviews-slider__button--right"
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={currentIndex === reviews.length - 1 || !reviews.length}
          />
        </>
      )}

      {errors && <Errors errors={errors} />}
    </div>
  );
};
