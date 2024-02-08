import React from 'react';
import classNames from 'classnames';
import { ServerErrorResponse } from '../../../types/ServerErrorResponse';
import './errors.scss';

type Props = {
  errors: ServerErrorResponse;
  className?: string;
};

export const Errors: React.FC<Props> = ({ errors, className }) => {
  const preparedErrors = Object.entries(errors);

  return (
    <div className={classNames('errors', className)}>
      <p className="errors__title">Помилки при завантаженні:</p>

      {preparedErrors.map(([errorName, messages], i) => {
        return (
          <article className="errors__error" key={errorName}>
            <p className="errors__name" key={errorName}>
              {`${i + 1}. ${errorName}:`}
            </p>

            {messages.map(message => (
              <p className="errors__message" key={message}>{`! ${message}`}</p>
            ))}
          </article>
        );
      })}
    </div>
  );
};
