import React from 'react';
import { Noop } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

interface InputPhoneNumberProps {
  error: string | undefined;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: Noop;
}

export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  error,
  label,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <label className="input">
      <p className="input__label">{label}</p>
      <MaskedInput
        mask={[
          '+',
          '3',
          '8',
          ' ',
          '(',
          '0',
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
        ]}
        placeholder="+38 (0__ ) ___-__-__"
        value={value}
        className={classNames('input__field', { 'input__field--error': error })}
        onFocus={() => onChange('+38 (0')}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        type="tel"
      />

      {error && (
        <p className="input__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </label>
  );
};
