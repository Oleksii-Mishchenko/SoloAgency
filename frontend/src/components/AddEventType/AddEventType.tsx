import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NewEventType } from '../../types/EventType';
import * as eventTypesActions from '../../features/eventTypesSlice';
import {
  handleMessageBlur,
  handleNameBlur,
} from '../../helpers/textManipulator';
import { AttachFile, TextArea, TextInput } from '../UI/inputs/fields';
import { MainButton } from '../UI/buttons/MainButton';
import { Notification } from '../Notification';
import './add-event-type.scss';

type Props = {
  relPage: string;
};

export const AddEventType: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { errorsAdding, isAdding, isAddSuccess } = useAppSelector(
    state => state.eventTypes,
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    setValue,
    trigger,
  } = useForm<NewEventType>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<NewEventType> = async (data: NewEventType) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    await dispatch(eventTypesActions.add(formData));

    reset();
  };

  return (
    <section className={`${relPage}__add-event-type add-event-type`}>
      <h2 className="add-event-type__title">Бажаєте додати послугу?</h2>

      <form
        className="add-event-type__form"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <TextInput
          type="text"
          label="Дайте назву послузі"
          placeholder="Назва"
          isRequired
          error={errors.name?.message}
          register={{
            ...register('name', {
              required: `Назва не може бути порожньою`,
              pattern: {
                value: /^[A-Za-zА-Яа-я ]+$/,
                message: 'Тільки українські та латинські літери',
              },
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('name', handleNameBlur(event.target.value));
                trigger('name');
              },
            }),
          }}
        />

        <TextArea
          label="Опис нашої послуги"
          rows={5}
          placeholder="Опис"
          isRequired
          error={errors.description?.message}
          register={{
            ...register('description', {
              required: `Опис не може бути порожнім`,
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('description', handleMessageBlur(event.target.value));
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
                label="Оберіть фото послуги"
                error={errors.photo?.message}
                defaultValue={value?.name || ''}
                value={value?.name}
                isRequired
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
          className="add-event-type__button"
          text="Опублікувати"
          isLoading={isAdding}
        />
      </form>

      {isAddSuccess && (
        <Notification
          className="add-event-type__notification"
          message={'Ваша послуга опублікована.'}
          onClose={() => dispatch(eventTypesActions.clearAddData())}
        />
      )}

      {errorsAdding && (
        <Notification
          className="add-event-type__notification"
          message="Послуга не була опублікована."
          errors={errorsAdding}
          onClose={() => dispatch(eventTypesActions.clearAddData())}
        />
      )}
    </section>
  );
};
