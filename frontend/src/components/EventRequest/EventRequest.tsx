import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '../../app/hooks';
import { InputPhoneNumber, TextInput, Textarea } from '../Inputs';
import { Dropdown } from '../Dropdown';
import { MainButton } from '../MainButton';
import { AuthLink } from '../AuthLink';
import { AuthLinkType } from '../../types/AuthLinkType';
import { EventRequestType } from '../../types/EventRequestType';
import './event-request.scss';

type Props = {
  relPage: string;
};

export const EventRequest: React.FC<Props> = ({ relPage }) => {
  const { token, user } = useAppSelector(state => state.auth.authData);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRequestType>({ mode: 'onTouched' });

  const onSubmit = (data: EventRequestType) => {
    console.log(data);
    reset();
  };

  return (
    <section className={`${relPage}__event-request event-request`}>
      <div className="event-request__header">
        <h2 className="event-request__title">
          Бажаєте замовити організацію події?
        </h2>

        {token && user ? (
          <p className="event-request__info">
            Заповніть форму нижче і ми зв'яжемось з вами!
          </p>
        ) : (
          <>
            <p className="event-request__sign-up-warn">
              Замовити організацію події можуть тільки зареєстровані
              користувачі.
            </p>

            <p className="event-request__sign-up-offer">
              {'Будь ласка, '}
              <AuthLink
                linkType={AuthLinkType.Register}
                name="Зареєструйтесь"
              />
              {' або '}
              <AuthLink linkType={AuthLinkType.Login} name="Увійдіть" />
              {' в свій обліковий запис.'}
            </p>
          </>
        )}
      </div>

      {token && user && (
        <form className="event-request__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="event-request__inputs">
            <div className="event-request__form-fields">
              <fieldset className="event-request__fieldset">
                <TextInput
                  label="Місто проведення"
                  placeholder="Місто"
                  error={errors.city?.message}
                  register={{
                    ...register('city', { required: 'Вкажіть місто' }),
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
                      onChange={(value: string) => field.onChange(value)}
                      onBlur={field.onBlur}
                      error={errors.phone?.message}
                      label="Номер телефону"
                    />
                  )}
                />
              </fieldset>

              <fieldset className="event-request__fieldset">
                <Dropdown label="Оберіть послугу" error={undefined} />
                <Dropdown label="Оберіть кількість" error={undefined} />

                <TextInput
                  label="Кількість гостей"
                  placeholder="Кількість"
                  error={errors.number_of_guests?.message}
                  register={{
                    ...register('number_of_guests', {
                      valueAsNumber: true,
                    }),
                  }}
                />

                <TextInput
                  label="Місце проведення"
                  placeholder="Місце"
                  error={errors.venue?.message}
                  register={{
                    ...register('venue'),
                  }}
                />

                <TextInput
                  label="Вкажіть стиль заходу"
                  placeholder="Стиль"
                  error={errors.style?.message}
                  register={{
                    ...register('style'),
                  }}
                />
              </fieldset>
            </div>

            <Textarea
              label="Особливі побажання"
              error={errors.description?.message}
              register={{ ...register('description') }}
            />
          </div>

          <MainButton
            className="event-request__button"
            type="submit"
            text="Надіслати"
          />
        </form>
      )}
    </section>
  );
};
