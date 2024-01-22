import React, { useCallback, useMemo, useState } from 'react';
import { avatarColors } from '../../assets/libs/avatarColors';
import { getRandomElement } from '../../helpers/getRandomElement';
import { Review as ReviewType } from '../../types/Review';
import { ControlButton } from '../ControlButton';
import { ControlButtonType } from '../../types/ControlButtonType';
import { Confirmation } from '../Confirmation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as reviewsActions from '../../features/reviewsSlice';
import { Notification } from '../Notification';
import './review.scss';

type Props = {
  review: ReviewType;
};

export const Review: React.FC<Props> = React.memo(
  ({ review: { id, text, user_name, rating, is_approved } }) => {
    const [hasApproveConfirm, setHasApproveConfirm] = useState<boolean>(false);
    const [isApproveNotified, setIsApproveNotified] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { approvingId, approvedReview, approveErrors } = useAppSelector(
      state => state.reviews,
    );
    const initial = user_name[0].toUpperCase();

    const avaColor = useMemo(() => {
      return getRandomElement(avatarColors);
    }, []);

    const handleApprove = useCallback(async () => {
      await dispatch(reviewsActions.approve(id));

      setHasApproveConfirm(false);
      setIsApproveNotified(true);
    }, []);

    return (
      <article className="review">
        <p className="review__text">{text}</p>

        <div className="review__wrapper">
          <div className="review__person">
            <div
              className="review__avatar"
              style={{ backgroundColor: avaColor }}
            >
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

          <div className="review__controls">
            <ControlButton
              buttonType={ControlButtonType.Remove}
              type="button"
              title="Видалити"
            />

            {!is_approved && (
              <ControlButton
                buttonType={ControlButtonType.Approve}
                type="button"
                title="Опублікувати"
                onClick={event => {
                  event.stopPropagation();
                  setHasApproveConfirm(true);
                }}
              />
            )}
          </div>
        </div>

        {hasApproveConfirm && (
          <Confirmation
            className="review__confirmation"
            message="Хочете опублікувати відгук?"
            isLoading={approvingId === id}
            onReject={() => setHasApproveConfirm(false)}
            onConfirm={handleApprove}
          />
        )}

        {isApproveNotified && approvedReview && (
          <Notification
            className="review__notification"
            message={`Відгук від ${approvedReview.user_name} було успішно опубліковано.`}
            onClose={() => dispatch(reviewsActions.clearApproveData())}
          />
        )}

        {isApproveNotified && approveErrors && (
          <Notification
            className="review__notification"
            message="Відгук не опубліковано!"
            errors={approveErrors}
            onClose={() => dispatch(reviewsActions.clearApproveData())}
          />
        )}
      </article>
    );
  },
);
