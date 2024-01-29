import React, { InputHTMLAttributes, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import './attach-file.scss';
import classNames from 'classnames';
import { ControlButton } from '../ControlButton';
import { ControlButtonType } from '../../types/ControlButtonType';

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
        <ControlButton
          type="button"
          title="Прикріпити зображення"
          buttonType={ControlButtonType.Attach}
          onClick={() => {
            inputRef.current?.click();
          }}
        />

        {value && (
          <ControlButton
            type="button"
            title="Відмінити вибір"
            buttonType={ControlButtonType.Remove}
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
