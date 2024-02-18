import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as portfolioActions from '../../../../features/portfolioSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { MainButton } from '../../../UI/buttons';
import { Notification } from '../../../UX';
import { NewProject } from '../../../../types/Project';
import { AttachFile, TextArea, TextInput } from '../../../UI/inputs/fields';
import {
  handleCommonBlur,
  handleProperBlur,
} from '../../../../helpers/textManipulator';
import './add-project.scss';

type Props = {
  relPage: string;
};

export const AddProject: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { errorsAdding, isAdding, isAddSuccess } = useAppSelector(
    state => state.portfolio,
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
  } = useForm<NewProject>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<NewProject> = async (data: NewProject) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    await dispatch(portfolioActions.add(formData));

    reset();
  };

  return (
    <section className={`${relPage}__add-project add-project`}>
      <h2 className="add-project__title">Бажаєте додати подію?</h2>

      <form
        className="add-project__form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <TextInput
          type="text"
          label="Дайте назву події"
          placeholder="Назва"
          isRequired
          error={errors.title?.message}
          register={{
            ...register('title', {
              required: `Назва не може бути порожньою`,
              pattern: {
                value: /^[A-Za-zА-Яа-я ]+$/,
                message: 'Тільки українські та латинські літери',
              },
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('title', handleProperBlur(event.target.value));
                trigger('title');
              },
            }),
          }}
        />

        <TextArea
          label="Опис нашої події"
          rows={5}
          placeholder="Опис"
          isRequired
          error={errors.description?.message}
          register={{
            ...register('description', {
              required: `Опис не може бути порожнім`,
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('description', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <Controller
          control={control}
          name="photo"
          rules={{ required: 'Будь ласка, додайте зображення.' }}
          render={({ field: { value, onChange } }) => {
            return (
              <AttachFile
                label="Оберіть фото події"
                isRequired
                error={errors.photo?.message}
                defaultValue={value?.name || ''}
                value={value?.name}
                readOnly
                onAttach={value => {
                  onChange(value);
                  trigger('photo');
                }}
              />
            );
          }}
        />

        <MainButton
          type="submit"
          className="add-project__button"
          text="Опублікувати"
          isLoading={isAdding}
        />
      </form>

      {isAddSuccess && (
        <Notification
          className="add-project__notification"
          message={'Ваша подія опублікована.'}
          onClose={() => dispatch(portfolioActions.clearAddData())}
        />
      )}

      {errorsAdding && (
        <Notification
          className="add-project__notification"
          message="Подія не була опублікована."
          errors={errorsAdding}
          onClose={() => dispatch(portfolioActions.clearAddData())}
        />
      )}
    </section>
  );
};
