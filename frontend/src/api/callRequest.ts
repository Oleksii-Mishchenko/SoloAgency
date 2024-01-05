import { CallRequestData } from '../types/CallRequestData';
import { client } from '../utils/axiosClient';

const callRequestUrl = 'agency/call-requests/';

export const addCallRequest = (
  callRequestData: CallRequestData,
): Promise<CallRequestData> => {
  return client.post<CallRequestData, CallRequestData>(
    callRequestUrl,
    callRequestData,
  );
};
