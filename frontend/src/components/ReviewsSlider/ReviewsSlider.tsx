import React, { useCallback, useEffect, useState } from 'react';
import { Review } from '../Review';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as reviewsActions from '../../features/reviewsSlice';
import { Errors } from '../Errors';
import { Media } from '../../types/Media';
import './reviews-slider.scss';
import { Notification } from '../Notification';

export const ReviewsSlider: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const dispatch = useAppDispatch();
  const { reviews, isLoading, errors, isDeleted, deleteErrors } =
    useAppSelector(state => state.reviews);
  const windowWidth = window.innerWidth;
  const shift = {
    wide: `translateX(calc(-${position * 50}% - ${position * 10}px))`,
    tablet: `translateX(calc(-${position * 100}%))`,
  };
  const currentShift =
    windowWidth < Media.TabletMax ? shift.tablet : shift.wide;
  const isRightDisabled =
    windowWidth < Media.TabletMax
      ? position >= Math.ceil(reviews.length / 2) - 1
      : position === reviews.length - 1;

  useEffect(() => {
    dispatch(reviewsActions.init());
  }, [dispatch]);

  const handleDelete = useCallback(async (id: number) => {
    await dispatch(reviewsActions.remove(id));

    setPosition(0);
  }, []);

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
              style={{ transform: currentShift }}
            >
              {reviews.map(review => {
                return (
                  <Review
                    review={review}
                    key={review.id}
                    onDelete={handleDelete}
                  />
                );
              })}
            </div>
          </div>

          <div className="reviews-slider__buttons">
            <button
              type="button"
              className="reviews-slider__button reviews-slider__button--left"
              onClick={() => setPosition(position - 1)}
              disabled={position <= 0}
            />

            <button
              type="button"
              className="reviews-slider__button reviews-slider__button--right"
              onClick={() => setPosition(position + 1)}
              disabled={isRightDisabled}
            />
          </div>
        </>
      )}

      {errors && <Errors errors={errors} />}

      {isDeleted && (
        <Notification
          className="reviews-slider__notification"
          message="Відгук успішно видалено"
          onClose={() => dispatch(reviewsActions.clearDeleteData())}
        />
      )}

      {deleteErrors && (
        <Notification
          className="reviews-slider__notification"
          message="Відгук не було видалено!"
          errors={deleteErrors}
          onClose={() => dispatch(reviewsActions.clearDeleteData())}
        />
      )}
    </div>
  );
};
