import { memo, FC, useRef, useState } from 'react';
import { Advice } from '../../types/Advice';
import classNames from 'classnames';
import { Confirmation } from '../Confirmation';
import './advice.scss';

type Props = {
  className: string;
  advice: Advice;
  isExpanded: boolean;
  setExpandedId: (id: number | null) => void;
  handleRemove: (id: number) => void;
  isDeleting: boolean;
};

export const AdviceAccordion: FC<Props> = memo(
  ({
    className,
    advice: { id, question, answer },
    isExpanded,
    setExpandedId,
    handleRemove,
    isDeleting,
  }) => {
    const [hasConfirmation, setHasConfirmation] = useState<boolean>(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    return (
      <article
        className={classNames(className, 'advice', {
          'advice--open': isExpanded,
        })}
      >
        <div className="advice__header">
          <p className="advice__question">{question}</p>

          <button
            type="button"
            title={isExpanded ? 'Згорнути' : 'Розгорнути'}
            className={classNames('advice__switcher', {
              'advice__switcher--open': isExpanded,
            })}
            onClick={() => setExpandedId(isExpanded ? null : id)}
          />
        </div>

        <div
          className="advice__drawer"
          style={
            isExpanded ? { height: drawerRef.current?.scrollHeight } : undefined
          }
        >
          <div className="advice__drawer-wrapper" ref={drawerRef}>
            <p className="advice__answer">{answer}</p>

            <div className="advice__controls">
              <button
                className="advice__control advice__control--edit"
                title="Редагувати"
              />

              <button
                className="advice__control advice__control--remove"
                title="Видалити"
                onClick={event => {
                  event.stopPropagation();
                  setHasConfirmation(true);
                }}
              />
            </div>
          </div>
        </div>

        {hasConfirmation && (
          <Confirmation
            className="advice__confirmation"
            message="Бажаєте видалити питання?"
            onReject={() => setHasConfirmation(false)}
            onConfirm={() => handleRemove(id)}
            isLoading={isDeleting}
          />
        )}
      </article>
    );
  },
);
