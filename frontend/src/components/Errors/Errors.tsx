import React from 'react';
import './errors.scss';
import { ServerErrorResponse } from '../../types/ServerErrorResponse';

type Props = {
  errors: ServerErrorResponse;
};

export const Errors: React.FC<Props> = ({ errors }) => {
  const preparedErrors = Object.entries(errors);

  return (
    <div className="errors">
      <p className="errors__title">Помилки при завантаженні:</p>

      {preparedErrors.map(([errorName, messages], i) => {
        return (
          <article className="errors__error">
            <p className="errors__name" key={errorName}>
              {`${i + 1}. ${errorName}:`}
            </p>

            {messages.map(message => (
              <p className="errors__message">{`! ${message}`}</p>
            ))}
          </article>
        );
      })}
    </div>
  );
};
