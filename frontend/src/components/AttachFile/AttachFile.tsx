import React, { InputHTMLAttributes, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import './attach-file.scss';
import classNames from 'classnames';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
  onAttach: (value: File | null) => void;
};

export const AttachFile: React.FC<Props> = ({
  className,
  label,
  error,
  onAttach,
  value,
  ...props
}) => {
  const fileName = value || 'Файл не вибрано';
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onAttach(file);
    }
  };

  const handleRemoveFile = () => {
    onAttach(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={classNames('attach-file', className)}>
      <p className="attach-file__label">{label}</p>

      <div className="attach-file__inputs">
        <button
          className="attach-file__input-button"
          type="button"
          onClick={() => {
            inputRef.current?.click();
          }}
        />

        {value && (
          <button
            type="button"
            className="attach-file__remove-button"
            onClick={handleRemoveFile}
          />
        )}

        <p className="attach-file__file-name">{fileName}</p>

        <input
          type="file"
          className="attach-file__input"
          {...props}
          ref={inputRef}
          onChange={handleAttachFile}
          accept=".jpg, .jpeg, .png"
        />
      </div>

      {error?.message && (
        <p className="attach-file__error">
          {error.message || 'Помилка при валідації даних.'}
        </p>
      )}
    </div>
  );
};
