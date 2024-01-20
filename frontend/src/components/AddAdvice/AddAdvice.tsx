import { NewAdvice } from '../../types/Advice';
import * as advicesActions from '../../features/advicesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { handleMessageBlur } from '../../helpers/textManipulator';
import { Input, Textarea } from '../Input';
import './add-advice.scss';
import { RatingType } from '../../types/Rating';
import { Rating } from '../Rating';
import { MainButton } from '../MainButton';
import { Notification } from '../Notification';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/getSearchWith';

type Props = {
  relPage: string;
};

export const AddAdvice: React.FC<Props> = ({ relPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isNotified, setIsNotified] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isUploadingAdvice, errorsUploading } = useAppSelector(
    state => state.advices,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<NewAdvice>({
    mode: 'onTouched',
    defaultValues: {
      question: '',
      answer: '',
      priority: 5,
    },
  });

  const onSubmit: SubmitHandler<NewAdvice> = async (data: NewAdvice) => {
    const response = await dispatch(advicesActions.add(data));

    setSearchParams(getSearchWith({ page: null }, searchParams));

    setIsNotified(true);

    if (response.type === 'post/advice/fulfilled') {
      reset();
    }
  };

  return (
    <section className={`${relPage}__add-advice add-advice`}>
      <h3 className="add-advice__title">Бажаєте додати питання?</h3>

      <form className="add-advice__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Напишіть питання"
          placeholder="Питання"
          errors={errors}
          register={{
            ...register('question', {
              required: `Питання не вказано`,
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('question', handleMessageBlur(event.target.value));
              },
            }),
          }}
        />

        <Textarea
          label="Напишіть відповідь на питання"
          rows={5}
          placeholder="Відповідь"
          errors={errors}
          register={{
            ...register('answer', {
              required: `Відповідь не вказано`,
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('answer', handleMessageBlur(event.target.value));
              },
            }),
          }}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Rating
              title="Оберіть пріоритет питання"
              value={field.value}
              onChange={(value: RatingType) => field.onChange(value)}
            />
          )}
        />

        <MainButton
          className="add-advice__button"
          text="Опублікувати"
          isLoading={isUploadingAdvice}
        />
      </form>

      {isNotified && !errorsUploading && (
        <Notification
          className="add-advice__notification"
          message="Питання і відповідь успішно опубліковані."
          onClose={() => setIsNotified(false)}
        />
      )}

      {isNotified && errorsUploading && (
        <Notification
          className="add-advice__notification"
          message="Питання і відповідь не були опубліковані."
          errors={errorsUploading}
          onClose={() => setIsNotified(false)}
        />
      )}
    </section>
  );
};
