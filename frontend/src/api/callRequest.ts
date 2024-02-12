import { CallRequest, CallRequestData } from '../types/CallRequestData';
import { client } from '../utils/axiosClient';

const callRequestUrl = 'agency/call-requests/';

export const addCallRequest = (
  callRequestData: CallRequestData,
): Promise<CallRequest> => {
  return client.post<CallRequest, CallRequestData>(
    callRequestUrl,
    callRequestData,
  );
};

export const getCallRequests = (): Promise<CallRequest[]> => {
  return client.get<CallRequest[]>(callRequestUrl);
};
