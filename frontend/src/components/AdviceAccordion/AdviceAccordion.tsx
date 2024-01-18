import { memo, FC, useRef } from 'react';
import { Advice } from '../../types/Advice';
import './advice.scss';
import classNames from 'classnames';
import { Confirmation } from '../Confirmation';

type Props = {
  className: string;
  advice: Advice;
  isOpen: boolean;
  setOpenedId: (id: number | null) => void;
};

export const AdviceAccordion: FC<Props> = memo(
  ({ className, advice: { id, question, answer }, isOpen, setOpenedId }) => {
    const handleAdviceOpening = () => {
      setOpenedId(isOpen ? null : id);
    };
    const drawerRef = useRef<HTMLDivElement>(null);

    return (
      <article
        className={classNames(className, 'advice', { 'advice--open': isOpen })}
      >
        <div className="advice__header">
          <p className="advice__question">{question}</p>

          <button
            type="button"
            title={isOpen ? 'Згорнути' : 'Розгорнути'}
            className={classNames('advice__switcher', {
              'advice__switcher--open': isOpen,
            })}
            onClick={handleAdviceOpening}
          />
        </div>

        <div
          className="advice__drawer"
          style={
            isOpen ? { height: drawerRef.current?.scrollHeight } : undefined
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
              />
            </div>
          </div>
        </div>

        <Confirmation
          className="advice__confirmation"
          message="Хочете видалити питання?"
        />
      </article>
    );
  },
);
