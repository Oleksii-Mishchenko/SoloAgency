import { useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../assets/libs/validation/schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as advicesActions from '../../../../features/advicesSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Advice } from '../../../../types/Advice';
import { handleCommonBlur } from '../../../../helpers/textManipulator';
import { Rating, TextArea, TextInput } from '../../../UI/inputs/fields';
import { RatingType } from '../../../../types/Rating';
import { MainButton } from '../../../UI/buttons';
import { useOuterClick } from '../../../../customHooks/useOuterClick';
import './edit-advice.scss';

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
  const editAdviceSchema = yup.object({
    id: yup.number().required(),
    question: schema.messageRequired(255),
    answer: schema.messageRequired(511),
    priority: schema.rating,
  });

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
    resolver: yupResolver<Advice>(editAdviceSchema),
  });

  const onSubmit: SubmitHandler<Advice> = async (data: Advice) => {
    await dispatch(advicesActions.edit(data));

    closeEditor();
  };

  return (
    <div className={`${className} edit-advice`} ref={editAdviceRef}>
      <h3 className="edit-advice__title">Будь ласка внесіть зміни</h3>

      <form className="edit-advice__form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label="Змініть питання"
          placeholder="Питання"
          isRequired
          error={errors.question?.message}
          register={{
            ...register('question', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('question', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <TextArea
          label="Змініть відповідь на питання"
          rows={4}
          placeholder="Відповідь"
          isRequired
          error={errors.answer?.message}
          register={{
            ...register('answer', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('answer', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Rating
              label="Оберіть пріоритет питання"
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
