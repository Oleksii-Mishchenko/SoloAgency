import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../../../../helpers/getSearchWith';
import { ControlButtonType } from '../../../../../types/ControlButtonType';
import { ControlButton } from '../../../buttons';
import './search-field.scss';

type Props = {
  relPage: string;
  searchBy: string;
};

export const SearchField: React.FC<Props> = ({ relPage, searchBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get(searchBy) || '';
  const [query, setQuery] = useState('');

  useEffect(() => {
    setQuery(appliedQuery);
  }, [appliedQuery]);

  const setSearchWith = (params: { [key: string]: string | null }) => {
    const newParams = getSearchWith(params);

    setSearchParams(newParams);
  };

  const applyQuery = useCallback(debounce(setSearchWith, 1000), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery({ [searchBy]: event.target.value || null });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query) {
      setSearchWith({ [searchBy]: query });
    }
  };

  return (
    <section className={`${relPage}__search-field search-field`}>
      <form className="search-field__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-field__input"
          placeholder="Введіть ключове слово, яке ви шукаєте"
          value={query}
          onChange={handleChange}
        />

        <ControlButton
          type="reset"
          value=""
          title="Скинути"
          className="search-field__reset"
          buttonType={ControlButtonType.Cross}
          onClick={() => setSearchWith({ [searchBy]: null })}
        />

        <ControlButton
          type="submit"
          value=""
          title="Знайти"
          className="search-field__submit"
          buttonType={ControlButtonType.Search}
        />
      </form>
    </section>
  );
};
