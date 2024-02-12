import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import * as eventsActions from '../../../../features/eventsSlice';
import {
  DatePicker,
  Dropdown,
  InputPhoneNumber,
  TextArea,
  TextInput,
} from '../../../UI/inputs/fields';
import { AuthLink, MainButton } from '../../../UI/buttons';
import { AuthLinkType } from '../../../../types/AuthLinkType';
import {
  EventRequestData,
  PreparedEventRequestData,
} from '../../../../types/Event';
import { SelectType } from '../../../../types/SelectType';
import { Notification } from '../../../UX';
import { cleanPhoneNumber } from '../../../../helpers/cleanPhoneNumber';
import './event-request.scss';

type Props = {
  relPage: string;
};

export const EventRequest: React.FC<Props> = ({ relPage }) => {
  const dispatch = useAppDispatch();
  const { event, eventRequestErrors, isEventRequestInProgress } =
    useAppSelector(state => state.events);
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRequestData>({ mode: 'onTouched' });

  const onSubmit = async (data: EventRequestData) => {
    const preparedData: PreparedEventRequestData = {
      ...data,
      date: data.date ? format(data.date, 'yyyy-MM-dd') : '',
      phone: cleanPhoneNumber(data.phone),
    };

    await dispatch(eventsActions.add(preparedData));

    reset();
  };

  const handleNotificationClose = () => {
    dispatch(eventsActions.clearEventRequestData());
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
                  isRequired
                  error={errors.city?.message}
                  register={{
                    ...register('city', { required: 'Вкажіть місто' }),
                  }}
                />

                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: 'Введіть номер телефону',
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
                      label="Номер телефону"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePicker
                      label="Дата"
                      error={errors.date?.message}
                      value={field.value}
                      onChange={value => field.onChange(value)}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="event_type"
                  rules={{
                    required: 'Вкажіть вид події',
                  }}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value}
                      onChange={(value: number) => field.onChange(value)}
                      placeholder="Оберіть вид події"
                      label="Вид події"
                      error={errors.event_type?.message}
                      isSearchable
                      isRequired
                      selectType={SelectType.EventTypes}
                    />
                  )}
                />
              </fieldset>

              <fieldset className="event-request__fieldset">
                <Controller
                  control={control}
                  defaultValue={undefined}
                  name="service"
                  rules={{
                    required: 'Вкажіть послугу',
                  }}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value}
                      onChange={(value: number) => field.onChange(value)}
                      placeholder="Оберіть послугу"
                      label="Послуга"
                      isRequired
                      error={errors.service?.message}
                      selectType={SelectType.Services}
                    />
                  )}
                />

                <TextInput
                  label="Орієнтовна кількість гостей"
                  placeholder="Кількість"
                  error={errors.number_of_guests?.message}
                  register={{
                    ...register('number_of_guests', {
                      valueAsNumber: true,
                    }),
                  }}
                />

                <TextInput
                  label="Локація святкування"
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

            <TextArea
              label="Особливі побажання"
              error={errors.description?.message}
              register={{ ...register('description') }}
            />
          </div>

          <MainButton
            className="event-request__button"
            type="submit"
            text="Надіслати"
            isLoading={isEventRequestInProgress}
          />
        </form>
      )}

      {event && (
        <Notification
          className="event-request__notification"
          message="Ваше замовлення прийнято. Дякуємо за звернення."
          onClose={handleNotificationClose}
        />
      )}

      {eventRequestErrors && (
        <Notification
          className="event-request__notification"
          message="Замовлення не прийнято!"
          errors={eventRequestErrors}
          onClose={handleNotificationClose}
        />
      )}
    </section>
  );
};
