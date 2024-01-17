import { Advice, Advices, NewAdvice } from '../types/Advice';
import { client } from '../utils/axiosClient';

const advicesUrl = 'agency/advices/';

export const loadAdvices = (): Promise<Advices> => {
  return client.get<Advices>(advicesUrl);
};

export const addAdvice = (advice: NewAdvice): Promise<Advice> => {
  return client.post<Advice, NewAdvice>(advicesUrl, advice);
};

export const removeAdvice = (adviceId: number) => {
  return client.delete(`${advicesUrl}${adviceId}`);
};
