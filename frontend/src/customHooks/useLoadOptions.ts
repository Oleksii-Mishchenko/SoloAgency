import { useEffect, useState } from 'react';
import { SelectType } from '../types/SelectType';
import { loadServices } from '../api/services';
import { loadEventTypesList } from '../api/eventTypes';
import { SelectOption } from '../types/SelectOption';
import { getSelectOptions } from '../helpers/getSelectOptions';

const loaders = {
  [SelectType.Services]: loadServices,
  [SelectType.EventTypes]: loadEventTypesList,
};

export const useLoadOptions = (selectType: SelectType) => {
  const serverRequest = loaders[selectType];

  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [options, setOptions] = useState<SelectOption[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingOptions(true);
        const result = await serverRequest();
        setOptions(getSelectOptions(result));
      } catch (error) {
        throw new Error('Error fetching data');
      } finally {
        setIsLoadingOptions(false);
      }
    };

    if (selectType) {
      fetchData();
    }
  }, [selectType, serverRequest]);

  return { isLoadingOptions, options };
};
