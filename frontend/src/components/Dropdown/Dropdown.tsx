import Select, { OnChangeValue } from 'react-select';
import { useState } from 'react';
import './dropdown.scss';

type DropdownProps = {
  label: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  error: string | undefined;
  isSearchable?: boolean;
};

interface Option {
  value: number;
  label: string;
}

const options: Option[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  isSearchable = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const handleChange = (selectedOption: OnChangeValue<Option, false>) => {
    if (selectedOption) {
      const selectedValue = (selectedOption as Option).value;
      onChange(selectedValue);
    }
  };

  const getValue = (newValue: number) => {
    return options.find(v => v.value === newValue);
  };

  const noOptionsMessage = ({ inputValue }: { inputValue: string }) =>
    inputValue ? 'Нічого не знайдено' : 'Виберіть опцію';

  return (
    <div className="dropdown">
      <label className="dropdown__label" htmlFor={label}>
        {label}
      </label>

      <Select
        inputId={label}
        isSearchable={isSearchable}
        options={options}
        noOptionsMessage={noOptionsMessage}
        value={getValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        menuIsOpen={isMenuOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        onFocus={onMenuOpen}
      />

      {error && (
        <p className="dropdown__error">
          {error || 'Помилка при валідації даних.'}
        </p>
      )}
    </div>
  );
};

// export const Dropdown: React.FC<DropdownProps> = ({ label, error }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const listRef = useRef<HTMLUListElement>(null);
//   useOuterClick(listRef, () => setIsOpen(false));

//   return (
//     <div className="dropdown">
//       <label htmlFor={label} className="dropdown__label">
//         {label}
//       </label>

//       <button
//         type="button"
//         id={label}
//         className={classNames('dropdown__field', {
//           'dropdown__field--error': error,
//           'dropdown__field--is-open': isOpen,
//         })}
//         onClick={e => {
//           setIsOpen(!isOpen);
//           e.stopPropagation();
//         }}
//       >
//         Press me
//       </button>

//       {isOpen && (
//         <ul className="dropdown__list" ref={listRef}>
//           <li className="dropdown__list-item">
//             <button className="dropdown__list-button">1234</button>
//           </li>

//           <li className="dropdown__list-item">
//             <button className="dropdown__list-button">5678</button>
//           </li>
//         </ul>
//       )}

//       {error && (
//         <p className="dropdown__error">
//           {error || 'Помилка при валідації даних.'}
//         </p>
//       )}
//     </div>
//   );
// };
