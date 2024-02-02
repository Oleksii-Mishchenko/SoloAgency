import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useOuterClick } from '../../customHooks/useOuterClick';
import './dropdown.scss';

type DropdownProps = {
  label: string;
  error: string | undefined;
};

// const options = [
//   { id: 1, name: 'Birthday' },
//   { id: 2, name: 'Wedding' },
//   { id: 3, name: 'Marriage' },
// ];

// export const Dropdown: React.FC<DropdownProps> = ({ label, error }) => {
//   return (
//     <div>Dropdown</div>
//   );
// };

export const Dropdown: React.FC<DropdownProps> = ({ label, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  useOuterClick(listRef, () => setIsOpen(false));

  return (
    <div className="dropdown">
      <label htmlFor={label} className="dropdown__label">
        {label}
      </label>

      <button
        type="button"
        id={label}
        className={classNames('dropdown__field', {
          'dropdown__field--error': error,
          'dropdown__field--is-open': isOpen,
        })}
        onClick={e => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
      >
        Press me
      </button>

      {isOpen && (
        <ul className="dropdown__list" ref={listRef}>
          <li className="dropdown__list-item">
            <button className="dropdown__list-button">1234</button>
          </li>

          <li className="dropdown__list-item">
            <button className="dropdown__list-button">5678</button>
          </li>
        </ul>
      )}

      {error && (
        <p className="dropdown__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </div>
  );
};
