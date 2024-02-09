import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as reviewsActions from '../../../../features/reviewsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Rating, TextArea } from '../../../UI/inputs/fields';
import { RatingType } from '../../../../types/Rating';
import { NewReview } from '../../../../types/Review';
import { handleMessageBlur } from '../../../../helpers/textManipulator';
import { MainButton, AuthLink } from '../../../UI/buttons';
import { Notification } from '../../../UX';
import { AuthLinkType } from '../../../../types/AuthLinkType';
import './add-review.scss';

type Props = {
  relPage: string;
};

export const AddReview: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector(state => state.auth.authData);
  const { addErrors, isAddingReview, isAddSuccess } = useAppSelector(
    state => state.reviews,
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<NewReview>({
    mode: 'onTouched',
    defaultValues: {
      rating: 5,
      text: '',
    },
  });

  const onSubmit: SubmitHandler<NewReview> = async (data: NewReview) => {
    if (token) {
      await dispatch(reviewsActions.add({ token, data }));
    }

    reset();
  };

  return (
    <section className={`${relPage}__add-review add-review`}>
      <h2 className="add-review__title">Бажаєте залишити відгук?</h2>

      {token && user ? (
        <>
          <form className="add-review__form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating
                  title="Поставте нам оцінку"
                  value={field.value}
                  onChange={(value: RatingType) => field.onChange(value)}
                />
              )}
            />

            <TextArea
              label="Напишіть про свій досвід взаємодії з нашим сервісом"
              rows={5}
              isRequired
              placeholder="Ваш відгук"
              error={errors.text?.message}
              register={{
                ...register('text', {
                  required: `Відгук не може бути порожнім`,
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('text', handleMessageBlur(event.target.value));
                  },
                }),
              }}
            />

            <MainButton
              type="submit"
              className="add-review__button"
              text="Надіслати"
              isLoading={isAddingReview}
            />
          </form>

          {isAddSuccess && (
            <Notification
              className="add-review__notification"
              message={`Дякуємо, ваш відгук отримано.\nВін буде опублікований найближчим часом.`}
              onClose={() => dispatch(reviewsActions.clearAddData())}
            />
          )}

          {addErrors && (
            <Notification
              className="add-review__notification"
              message="Відгук не був опублікований."
              errors={addErrors}
              onClose={() => dispatch(reviewsActions.clearAddData())}
            />
          )}
        </>
      ) : (
        <>
          <p className="add-review__sign-up-warn">
            Відгуки можуть залишати тільки зареєстровані користувачі.
          </p>

          <p className="add-review__sign-up-offer">
            {'Будь ласка, '}
            <AuthLink linkType={AuthLinkType.Register} name="Зареєструйтесь" />
            {' або '}
            <AuthLink linkType={AuthLinkType.Login} name="Увійдіть" />
            {' в свій обліковий запис.'}
          </p>
        </>
      )}
    </section>
  );
};
