import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CallRequestData } from '../../../../types/CallRequestData';
import { MainButton } from '../../../UI/buttons';
import {
  InputPhoneNumber,
  TextArea,
  TextInput,
} from '../../../UI/inputs/fields';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as callRequestActions from '../../../../features/callRequestSlice';
import {
  handleCityChange,
  handleNameBlur,
  trimString,
} from '../../../../helpers/textManipulator';
import { Notification } from '../../../UX';
import { cleanPhoneNumber } from '../../../../helpers/cleanPhoneNumber';
import './call-request.scss';

type Props = {
  relPage: string;
};

export const CallRequest: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { callRequest, isUploading, callRequestErrors } = useAppSelector(
    state => state.callRequest,
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    trigger,
    control,
  } = useForm<CallRequestData>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<CallRequestData> = async (
    data: CallRequestData,
  ) => {
    data.phone = cleanPhoneNumber(data.phone);
    await dispatch(callRequestActions.add(data));
    reset();
  };

  return (
    <article className={`${relPage}__call-request call-request`}>
      <div className="call-request__info">
        <h2 className="call-request__title">Замовити дзвінок?</h2>

        <p className="call-request__description">
          Заповнюй свої дані, а наша команда сконтактує вас найближчим часом для
          того, аби відповісти на всі ваші запитання
        </p>
      </div>

      <form className="call-request__form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="call-request__form-fieldset">
          <TextInput
            label="Ваше ім’я"
            isRequired
            placeholder="Ім'я"
            error={errors.name?.message}
            defaultValue={undefined}
            register={{
              ...register('name', {
                required: `Вкажіть ваше ім'я`,
                minLength: {
                  value: 2,
                  message: 'Не менше 2 символів',
                },
                maxLength: {
                  value: 30,
                  message: `Не більше 30 символів`,
                },
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

          <TextInput
            label="З якого Ви міста?"
            placeholder="Місто"
            error={errors.city?.message}
            register={{
              ...register('city', {
                minLength: {
                  value: 2,
                  message: 'Не менше 2 символів',
                },
                maxLength: {
                  value: 30,
                  message: 'Не більше 30 символів',
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-я ]+$/,
                  message: 'Тільки українські та латинські літери',
                },

                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  const handledValue = handleCityChange(event.target.value);

                  setValue('city', handledValue);
                },

                onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                  const trimmedValue = trimString(event.target.value);

                  setValue('city', trimmedValue);
                },
              }),
            }}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Поле є обов'язковим",
              pattern: {
                value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'Введіть правильний номер телефону',
              },
            }}
            render={({ field }) => (
              <InputPhoneNumber
                value={field.value}
                isRequired
                onChange={(value: string) => field.onChange(value)}
                onBlur={field.onBlur}
                error={errors.phone?.message}
                label="Залиште свій номер телефону"
              />
            )}
          />

          <TextArea
            label="Опишіть тему звернення"
            rows={5}
            placeholder="Деталі"
            error={errors.description?.message}
            register={{
              ...register('description', {
                maxLength: { value: 200, message: 'Не більше 200 символів' },
              }),
            }}
          />
        </fieldset>

        <MainButton
          isLoading={isUploading}
          disabled={isUploading}
          type="submit"
          text="Замовити"
          className="call-request__button"
        />
      </form>

      {callRequestErrors && (
        <Notification
          className="call-request__notification"
          message="Звернення не отримано"
          errors={callRequestErrors}
          onClose={() => dispatch(callRequestActions.clearCallRequestErrors())}
        />
      )}

      {callRequest && (
        <Notification
          className="call-request__notification"
          message={`${callRequest.name}, дякуємо Вам за звернення!\nНаша команда зв'яжеться з Вами найближчим часом`}
          onClose={() => dispatch(callRequestActions.clearCallRequest())}
        />
      )}
    </article>
  );
};