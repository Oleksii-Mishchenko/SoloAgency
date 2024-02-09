import React, { InputHTMLAttributes, useRef } from 'react';
import classNames from 'classnames';
import { ControlButton } from '../../../buttons';
import { ControlButtonType } from '../../../../../types/ControlButtonType';
import { InputError, Label } from '../../elements';
import './attach-file.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
  error: string | undefined;
  onAttach: (value: File | null) => void;
};

export const AttachFile: React.FC<Props> = ({
  className,
  label,
  isRequired,
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
      <Label label={label} isRequired={isRequired} />

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
          id={label}
          type="file"
          className="attach-file__input"
          {...props}
          ref={inputRef}
          onChange={handleAttachFile}
          accept=".jpg, .jpeg, .png"
        />
      </div>

      {error && <InputError errorMessage={error} />}
    </div>
  );
};
