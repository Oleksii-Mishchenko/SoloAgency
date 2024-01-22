import { memo, FC, useRef, useState } from 'react';
import { Advice } from '../../types/Advice';
import classNames from 'classnames';
import { Confirmation } from '../Confirmation';
import { EditAdvice } from '../EditAdvice';
import { ControlButton } from '../ControlButton';
import { ControlButtonType } from '../../types/ControlButtonType';
import './advice.scss';

type Props = {
  className: string;
  advice: Advice;
  isExpanded: boolean;
  setExpandedId: (id: number | null) => void;
  handleRemove: (id: number) => Promise<void>;
  isDeleting: boolean;
};

export const AdviceAccordion: FC<Props> = memo(
  ({
    className,
    advice,
    isExpanded,
    setExpandedId,
    handleRemove,
    isDeleting,
  }) => {
    const { id, question, answer } = advice;
    const [hasDelConfirm, setHasDelConfirm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
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
              <ControlButton
                buttonType={ControlButtonType.Edit}
                type="button"
                title="Редагувати"
                onClick={event => {
                  event.stopPropagation();
                  setIsEditing(true);
                }}
              />

              <ControlButton
                buttonType={ControlButtonType.Remove}
                type="button"
                title="Видалити"
                onClick={event => {
                  event.stopPropagation();
                  setHasDelConfirm(true);
                }}
              />
            </div>
          </div>
        </div>

        {hasDelConfirm && (
          <Confirmation
            className="advice__confirmation"
            message="Бажаєте видалити питання?"
            onReject={() => setHasDelConfirm(false)}
            onConfirm={() => handleRemove(id)}
            isLoading={isDeleting}
          />
        )}

        {isEditing && (
          <EditAdvice
            className="advice__edit-advice"
            advice={advice}
            closeEditor={() => setIsEditing(false)}
          />
        )}
      </article>
    );
  },
);
