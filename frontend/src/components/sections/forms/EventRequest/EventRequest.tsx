import { LegacyRef, memo, FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../assets/libs/validation/schema';
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
import {
  handleCommonBlur,
  handleProperBlur,
} from '../../../../helpers/textManipulator';
import './event-request.scss';

type Props = {
  relPage: string;
  sectionRef: LegacyRef<HTMLElement>;
};

export const EventRequest: FC<Props> = memo(({ relPage, sectionRef }) => {
  const eventRequestSchema = yup.object({
    city: schema.cityRequired,
    phone: schema.phoneRequired,
    date: schema.date,
    event_type: schema.dropdownRequired('вид події'),
    service: schema.dropdownRequired('послугу'),
    number_of_guests: schema.numberOfGuests,
    venue: schema.message(63),
    style: schema.message(63),
    description: schema.message(500),
  });

  const dispatch = useAppDispatch();
  const { event, eventRequestErrors, isEventRequestInProgress } =
    useAppSelector(state => state.events);
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EventRequestData>({
    mode: 'onTouched',
    defaultValues: {
      city: '',
      phone: '',
      date: null,
      event_type: undefined,
      service: undefined,
      number_of_guests: null,
      venue: null,
      style: null,
      description: null,
    },
    resolver: yupResolver<EventRequestData>(eventRequestSchema),
  });

  const onSubmit = async (data: EventRequestData) => {
    const preparedData: PreparedEventRequestData = {
      ...data,
      date: data.date ? format(data.date, 'yyyy-MM-dd') : null,
      phone: cleanPhoneNumber(data.phone),
    };

    await dispatch(eventsActions.add(preparedData));

    reset();
  };

  const handleNotificationClose = () => {
    dispatch(eventsActions.clearEventRequestData());
  };

  return (
    <section
      className={`${relPage}__event-request event-request`}
      ref={sectionRef}
    >
      <div className="event-request__header">
        <h2 className="event-request__title">
          Бажаєте замовити організацію події?
        </h2>

        {!token && (
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
        <>
          <p className="event-request__info">
            Заповніть форму нижче і ми зв'яжемось з вами!
          </p>

          <form
            className="event-request__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="event-request__inputs">
              <div className="event-request__form-fields">
                <fieldset className="event-request__fieldset">
                  <TextInput
                    label="Місто проведення"
                    placeholder="Місто"
                    isRequired
                    error={errors.city?.message}
                    register={{
                      ...register('city', {
                        onBlur: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setValue(
                            'city',
                            handleProperBlur(event.target.value),
                          );
                        },
                      }),
                    }}
                  />

                  <Controller
                    control={control}
                    name="phone"
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
                        value={field?.value}
                        onChange={value => field.onChange(value)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="event_type"
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
                        onChange: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          if (event.target.value === '') {
                            setValue('number_of_guests', null);
                          }
                        },
                        onBlur: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const value = event.target.value;
                          setValue('number_of_guests', value ? value : null);
                        },
                      }),
                    }}
                  />

                  <TextInput
                    label="Локація святкування"
                    placeholder="Місце"
                    error={errors.venue?.message}
                    register={{
                      ...register('venue', {
                        onBlur: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setValue(
                            'venue',
                            event.target.value
                              ? handleCommonBlur(event.target.value)
                              : null,
                          );
                        },
                      }),
                    }}
                  />

                  <TextInput
                    label="Вкажіть стиль заходу"
                    placeholder="Стиль"
                    error={errors.style?.message}
                    register={{
                      ...register('style', {
                        onBlur: (
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          setValue(
                            'style',
                            event.target.value
                              ? handleCommonBlur(event.target.value)
                              : null,
                          );
                        },
                      }),
                    }}
                  />
                </fieldset>
              </div>

              <TextArea
                label="Особливі побажання"
                error={errors.description?.message}
                register={{
                  ...register('description', {
                    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                      setValue(
                        'description',
                        event.target.value
                          ? handleCommonBlur(event.target.value)
                          : null,
                      );
                    },
                  }),
                }}
              />
            </div>

            <MainButton
              className="event-request__button"
              type="submit"
              text="Надіслати"
              isLoading={isEventRequestInProgress}
            />
          </form>
        </>
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
});
