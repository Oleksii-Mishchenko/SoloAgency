import { DropdownObject } from '../types/DropdownObject';
import { PaginationResult } from '../types/PaginationConfig';
import { SelectOption } from '../types/SelectOption';

export const getSelectOptions = (
  response: DropdownObject[] | PaginationResult<DropdownObject>,
): SelectOption[] => {
  const list = Array.isArray(response) ? response : response.results;

  const selectOptions: SelectOption[] = list.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return selectOptions;
};
