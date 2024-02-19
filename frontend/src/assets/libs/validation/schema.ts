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
    .max(30, 'Не більше 30 символів')
    .matches(/^[A-Za-zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'ʼ -]+$/, {
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

  message: (num: number) =>
    yup.string().max(num, `Не більше ${num} символів`).nullable(),

  messageRequired: (num: number) =>
    yup
      .string()
      .required('Поле не може бути порожнім')
      .max(num, `Не більше ${num} символів`),

  rating: yup
    .mixed<RatingType>()
    .required('Будь ласка поставте оцінку')
    .oneOf([1, 2, 3, 4, 5], 'Поставте оцінку від 1 до 5'),

  email: yup
    .string()
    .required('Вкажіть вашу електронну пошту')
    .max(254, 'Занадто довга адреса')
    .email('Некоректна адреса електронної пошти')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введіть повну адресу'),

  password: yup
    .string()
    .required('Вкажіть Ваш пароль')
    .max(128, 'Занадто довгий пароль'),

  createPassword: yup
    .string()
    .required('Вкажіть Ваш пароль')
    .max(128, 'Занадто довгий пароль')
    .min(5, 'Мінімум 5 символів')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*)(+=_-])/,
      'Тільки маленькі та великі латинські літери, цифри та спецсимвол',
    ),

  repeatPassword: yup
    .string()
    .required('Повторіть пароль')
    .max(128, 'Занадто довгий пароль')
    .min(5, 'Мінімум 5 символів')
    .oneOf([yup.ref('password'), ''], 'Паролі не співпадають'),
};
