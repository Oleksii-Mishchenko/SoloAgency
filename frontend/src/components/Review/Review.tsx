import React, { useMemo } from 'react';
import { avatarColors } from '../../assets/libs/avatarColors';
import { getRandomElement } from '../../helpers/getRandomElement';
import { Review as ReviewType } from '../../types/Review';
import './review.scss';

type Props = {
  review: ReviewType;
};

export const Review: React.FC<Props> = React.memo(({ review }) => {
  const { text, user_name, rating } = review;
  const initial = user_name[0].toUpperCase();
  const avaColor = useMemo(() => {
    return getRandomElement(avatarColors);
  }, []);

  return (
    <article className="review">
      <p className="review__text">{text}</p>

      <div className="review__person">
        <div className="review__avatar" style={{ backgroundColor: avaColor }}>
          {initial}
        </div>

        <div className="review__info">
          <p className="review__name">{user_name}</p>

          <div className={`review__stars review__stars--${rating}`}>
            <div className="review__stars-star" />
            <div className="review__stars-star" />
            <div className="review__stars-star" />
            <div className="review__stars-star" />
            <div className="review__stars-star" />
          </div>
        </div>
      </div>
    </article>
  );
});
