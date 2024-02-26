import * as yup from 'yup';
import { RatingType } from '../../../types/Rating';

export const schema = {
  name: yup
    .string()
    .nullable()
    .max(30, 'Не більше 30 символів')
    .matches(
      /^[A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ ]+$/,
      'Тільки українські або латинські літери',
    )
    .transform((value, originalValue) => {
      return originalValue == null || originalValue === '' ? null : value;
    }),

  nameRequired: yup
    .string()
    .required("Вкажіть Ваше ім'я")
    .min(2, 'Не менше 2 символів')
    .max(30, 'Не більше 30 символів')
    .matches(
      /^[A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ ]+$/,
      'Тільки українські або латинські літери',
    ),

  city: yup
    .string()
    .nullable()
    .max(63, 'Не більше 63 символів')
    .matches(/^[0-9A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ -]+$/, {
      message: 'Тільки українські або латинські літери',
      excludeEmptyString: true,
    }),

  cityRequired: yup
    .string()
    .required('Введіть назву міста')
    .min(2, 'Не менше 2 символів')
    .max(63, 'Не більше 63 символів')
    .matches(/^[0-9A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ -]+$/, {
      message: 'Тільки українські або латинські літери',
      excludeEmptyString: true,
    }),

  phoneRequired: yup
    .string()
    .required('Введіть номер телефону')
    .matches(
      /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      'Введіть номер телефону повністю',
    ),

  phone: yup
    .string()
    .nullable()
    .matches(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
      message: 'Введіть номер телефону повністю',
      excludeEmptyString: true,
    }),

  date: yup
    .date()
    .nullable()
    .min(new Date(), 'Дата не може бути раніше сьогоднішньої'),

  numberOfGuests: yup
    .number()
    .nullable()
    .integer('Введіть ціле число')
    .positive('Введіть додатне число')
    .typeError('Тільки число'),

  dropdownRequired: (type: string) => yup.number().required(`Вкажіть ${type}`),

  message: (max: number) =>
    yup
      .string()
      .max(max, `Не більше ${max} символів`)
      .nullable()
      .matches(
        /^[0-9A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ!"№;%:?*)(_+=₴.,@#$^&|`~<> / }{ -]+$/,
        {
          message: 'Тільки українські або латинські літери',
          excludeEmptyString: true,
        },
      ),

  messageRequired: (max: number) =>
    yup
      .string()
      .required('Поле не може бути порожнім')
      .max(max, `Не більше ${max} символів`)
      .matches(
        /^[0-9A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ!"№;%:?*)(_+=₴.,@#$^&|`~<> / }{ -]+$/,
        {
          message: 'Тільки українські або латинські літери',
          excludeEmptyString: true,
        },
      ),

  photo: yup
    .mixed<File>()
    .required('Додайте фотографію')
    .test('fileType', 'Невірний формат файлу', value => {
      const extension = value.name.split('.').pop();

      return ['.jpg', '.jpeg', '.png'].includes(`.${extension}`);
    })
    .test('fileSize', 'Файл занадто великий', value => {
      return value.size <= 10485760;
    }),

  rating: yup
    .mixed<RatingType>()
    .required('Будь ласка поставте оцінку')
    .oneOf([1, 2, 3, 4, 5], 'Поставте оцінку від 1 до 5'),

  email: yup
    .string()
    .required('Вкажіть вашу електронну пошту')
    .max(254, 'Занадто довга адреса')
    .email('Некоректна адреса електронної пошти')
    .matches(
      /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
      'Тільки літери, цифри, крапки (.) та символи підкреслювання (_).',
    ),

  password: yup
    .string()
    .required('Вкажіть Ваш пароль')
    .max(21, 'Занадто довгий пароль'),

  createPassword: yup
    .string()
    .required('Вкажіть Ваш пароль')
    .max(21, 'Занадто довгий пароль. Максимум 21 символ')
    .min(5, 'Мінімум 5 символів')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+])[^\s]+$/,
      'Тільки маленькі та великі латинські літери, цифри та спецсимвол',
    ),

  repeatPassword: yup
    .string()
    .required('Повторіть пароль')
    .max(21, 'Занадто довгий пароль. Максимум 21 символ')
    .min(5, 'Мінімум 5 символів')
    .oneOf([yup.ref('password'), ''], 'Паролі не співпадають'),
};
