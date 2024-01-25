import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { getSearchWith } from '../../helpers/getSearchWith';
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

    setSearchWith({ [searchBy]: query });
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

        <input
          type="reset"
          value=""
          className="search-field__reset"
          onClick={() => setSearchWith({ [searchBy]: null })}
        />
        <input type="submit" value="" className="search-field__submit" />
      </form>
    </section>
  );
};
