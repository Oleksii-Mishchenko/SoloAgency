import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Advice } from '../../types/Advice';
import * as advicesActions from '../../features/advicesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './edit-advice.scss';
import { Input, Textarea } from '../Input';
import { handleMessageBlur } from '../../helpers/textManipulator';
import { Rating } from '../Rating';
import { RatingType } from '../../types/Rating';
import { MainButton } from '../MainButton';
import { useRef } from 'react';
import { useOuterClick } from '../../customHooks/useOuterClick';

type Props = {
  className: string;
  advice: Advice;
  closeEditor: () => void;
};

export const EditAdvice: React.FC<Props> = ({
  className,
  advice,
  closeEditor,
}) => {
  const dispatch = useAppDispatch();
  const { isPatchingAdvice } = useAppSelector(state => state.advices);
  const editAdviceRef = useRef<HTMLDivElement>(null);
  useOuterClick(editAdviceRef, closeEditor);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm<Advice>({
    mode: 'onTouched',
    defaultValues: advice,
  });

  const onSubmit: SubmitHandler<Advice> = async (data: Advice) => {
    await dispatch(advicesActions.edit(data));

    closeEditor();
  };

  return (
    <div className={`${className} edit-advice`} ref={editAdviceRef}>
      <h3 className="edit-advice__title">Будь ласка внесіть зміни</h3>

      <form className="edit-advice__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Змініть питання"
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
          label="Змініть відповідь на питання"
          rows={4}
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

        <div className="edit-advice__buttons">
          <MainButton
            type="submit"
            className="edit-advice__button"
            text="Зберегти"
            white
            isLoading={isPatchingAdvice}
          />

          <MainButton
            className="edit-advice__button"
            text="Скасувати"
            onClick={closeEditor}
          />
        </div>
      </form>
    </div>
  );
};