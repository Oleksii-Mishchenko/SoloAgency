import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as reviewsActions from '../../../../features/reviewsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Rating, TextArea } from '../../../UI/inputs/fields';
import { RatingType } from '../../../../types/Rating';
import { NewReview } from '../../../../types/Review';
import { handleCommonBlur } from '../../../../helpers/textManipulator';
import { MainButton } from '../../../UI/buttons';
import { Notification, UnauthorizedMessage } from '../../../UX';
import './add-review.scss';
import { schema } from '../../../../assets/libs/validation/schema';

type Props = {
  relPage: string;
};

export const AddReview: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const { addErrors, isAddingReview, isAddSuccess } = useAppSelector(
    state => state.reviews,
  );

  const newReviewSchema = yup.object({
    rating: schema.rating,
    text: schema.messageRequired(200),
  });

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
    resolver: yupResolver<NewReview>(newReviewSchema),
  });

  const onSubmit: SubmitHandler<NewReview> = async (data: NewReview) => {
    await dispatch(reviewsActions.add(data));

    reset();
  };

  return (
    <section className={`${relPage}__add-review add-review`}>
      <h2 className="add-review__title">Бажаєте залишити відгук?</h2>

      {token && user && (
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
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('text', handleCommonBlur(event.target.value));
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
      )}

      {!token && (
        <UnauthorizedMessage
          warning={'Відгуки можуть залишати тільки зареєстровані користувачі.'}
        />
      )}
    </section>
  );
};
