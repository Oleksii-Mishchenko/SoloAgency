import { Advice, NewAdvice } from '../types/Advice';
import { client } from '../utils/axiosClient';

const advicesUrl = 'agency/advices/';

export const loadAdvices = () => {
  return client.get<Advice[]>(advicesUrl);
};

export const addAdvice = (advice: NewAdvice) => {
  return client.post<Advice, NewAdvice>(advicesUrl, advice);
};

export const deleteAdvice = (adviceId: number) => {
  return client.delete(`${advicesUrl}${adviceId}`);
};
