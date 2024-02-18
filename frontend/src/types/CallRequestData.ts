import { PaginationResult } from './PaginationConfig';

export interface CallRequestData {
  name: string;
  description?: string | null;
  city?: string | null;
  phone: string;
}

export interface CallRequest extends CallRequestData {
  id: number;
  created_at: string;
}

export type CallRequests = PaginationResult<CallRequest>;
