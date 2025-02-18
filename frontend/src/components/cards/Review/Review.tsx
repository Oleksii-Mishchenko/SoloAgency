import React, { useCallback, useMemo, useState } from 'react';
import { avatarColors } from '../../../assets/libs/avatarColors';
import { getRandomElement } from '../../../helpers/getRandomElement';
import { Review as ReviewType } from '../../../types/Review';
import { ControlButton } from '../../UI/buttons';
import { ControlButtonType } from '../../../types/ControlButtonType';
import { Confirmation, Notification } from '../../UX';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as reviewsActions from '../../../features/reviewsSlice';
import './review.scss';

type Props = {
  review: ReviewType;
  onDelete: (id: number) => Promise<void>;
};

export const Review: React.FC<Props> = React.memo(
  ({ review: { id, text, user_name, rating, is_approved }, onDelete }) => {
    const [hasApproveConfirm, setHasApproveConfirm] = useState<boolean>(false);
    const [hasDeleteConfirm, setHasDeleteConfirm] = useState<boolean>(false);
    const [hasApproveNote, setHasApproveNote] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { approvingId, approvedReview, approveErrors, deletingId } =
      useAppSelector(state => state.reviews);
    const { token } = useAppSelector(state => state.auth);
    const { user } = useAppSelector(state => state.user);
    const initial = user_name[0].toUpperCase();

    const avaColor = useMemo(() => {
      return getRandomElement(avatarColors);
    }, []);

    const handleApprove = useCallback(async () => {
      await dispatch(reviewsActions.approve(id));

      setHasApproveConfirm(false);
      setHasApproveNote(true);
    }, []);

    const handleNotificationClose = () => {
      dispatch(reviewsActions.clearApproveData());
      setHasApproveNote(false);
    };

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

          {token && user?.is_staff && (
            <div className="review__controls">
              <ControlButton
                className="control-button--has-border"
                buttonType={ControlButtonType.Remove}
                type="button"
                title="Видалити"
                onClick={event => {
                  event.stopPropagation();
                  setHasDeleteConfirm(true);
                }}
              />

              {!is_approved && (
                <ControlButton
                  className="control-button--has-border"
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
          )}
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

        {hasApproveNote && approvedReview && (
          <Notification
            className="review__notification"
            message={`Відгук від ${approvedReview.user_name} було успішно опубліковано.`}
            onClose={handleNotificationClose}
          />
        )}

        {hasApproveNote && approveErrors && (
          <Notification
            className="review__notification"
            message="Відгук не опубліковано!"
            errors={approveErrors}
            onClose={handleNotificationClose}
          />
        )}

        {hasDeleteConfirm && (
          <Confirmation
            className="review__confirmation"
            message="Хочете видалити відгук?"
            isLoading={deletingId === id}
            onReject={() => setHasDeleteConfirm(false)}
            onConfirm={() => onDelete(id)}
          />
        )}
      </article>
    );
  },
);
