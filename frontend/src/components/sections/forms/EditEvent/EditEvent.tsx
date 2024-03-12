import { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../assets/libs/validation/schema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as eventTypeActions from '../../../../features/eventTypesSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { handleCommonBlur } from '../../../../helpers/textManipulator';
import { AttachFile, TextArea, TextInput } from '../../../UI/inputs/fields';
import { MainButton } from '../../../UI/buttons';
import { useOuterClick } from '../../../../customHooks/useOuterClick';
import { EditEventType, EventType } from '../../../../types/EventType';
import './edit-event.scss';

type Props = {
  className: string;
  eventType: EventType;
  closeEditor: () => void;
};

export const EditEvent: React.FC<Props> = ({
  className,
  eventType: { id, name, description },
  closeEditor,
}) => {
  const editEventSchema = yup.object({
    name: schema.messageRequired(255),
    description: schema.messageRequired(255),
    photo: schema.photoNotRequired,
  });

  const dispatch = useAppDispatch();
  const { isPatchingEventType } = useAppSelector(state => state.eventTypes);
  const editEventRef = useRef<HTMLDivElement>(null);
  useOuterClick(editEventRef, closeEditor);

  useEffect(() => {
    if (editEventRef.current) {
      editEventRef.current.scrollIntoView();
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    control,
    trigger,
  } = useForm<EditEventType>({
    mode: 'onTouched',
    defaultValues: { name, description },
    resolver: yupResolver<EditEventType>(editEventSchema),
  });

  const onSubmit: SubmitHandler<EditEventType> = async (
    data: EditEventType,
  ) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    await dispatch(eventTypeActions.edit({ formData, id }));
    reset();
    closeEditor();
  };

  return (
    <div className={`${className} edit-event`} ref={editEventRef}>
      <h3 className="edit-event__title">Будь ласка внесіть зміни</h3>

      <form className="edit-event__form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="text"
          label="Змініть назву послуги"
          placeholder="Назва"
          isRequired
          error={errors.name?.message}
          register={{
            ...register('name', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('name', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <TextArea
          label="Змініть опис послуги"
          rows={4}
          placeholder="Опис"
          isRequired
          error={errors.description?.message}
          register={{
            ...register('description', {
              onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                setValue('description', handleCommonBlur(event.target.value));
              },
            }),
          }}
        />

        <Controller
          control={control}
          name="photo"
          render={({ field: { value, onChange } }) => {
            return (
              <AttachFile
                label="Оберіть фото послуги"
                error={errors.photo?.message}
                value={value?.name}
                onAttach={value => {
                  onChange(value);
                  trigger('photo');
                }}
              />
            );
          }}
        />

        <div className="edit-event__buttons">
          <MainButton
            type="submit"
            className="edit-event__button"
            text="Зберегти"
            white
            isLoading={isPatchingEventType}
          />

          <MainButton
            className="edit-event__button"
            text="Скасувати"
            onClick={closeEditor}
            disabled={isPatchingEventType}
          />
        </div>
      </form>
    </div>
  );
};
