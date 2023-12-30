import { Advice, NewAdvice } from '../types/Advice';
import { client } from '../utils/axiosClient';

const advicesUrl = 'agency/advices/';

export const loadAdvices = (): Promise<Advice[]> => {
  return client.get<Advice[]>(advicesUrl);
};

export const addAdvice = (advice: NewAdvice): Promise<Advice> => {
  return client.post<Advice, NewAdvice>(advicesUrl, advice);
};

export const removeAdvice = (adviceId: number) => {
  return client.delete(`${advicesUrl}${adviceId}`);
};
