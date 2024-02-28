import {
  CallRequest,
  CallRequestData,
  CallRequests,
} from '../types/CallRequestData';
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

export const getCallRequests = (params: string): Promise<CallRequests> => {
  return client.get<CallRequests>(callRequestUrl + params);
};

export const patchCallRequest = (
  data: Partial<CallRequest>,
  id: number,
): Promise<CallRequest> => {
  return client.patch<CallRequest, Partial<CallRequest>>(
    `${callRequestUrl}${id}/`,
    data,
  );
};
