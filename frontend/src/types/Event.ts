import { OrderStatus } from './OrderStatus';
import { PaginationResult } from './PaginationConfig';

export interface Event {
  id: number;
  customer: string;
  service_name: string;
  description: string;
  number_of_guests: number;
  event_type_name: string;
  date: string;
  style: string;
  city: string;
  created_at: string;
  venue: string;
  phone: string;
  status: OrderStatus;
}

export interface EventRequestData {
  city: string;
  phone: string;
  date?: Date | null;
  service: number;
  description?: string | null;
  number_of_guests?: number | string | null;
  event_type: number;
  style?: string | null;
  venue?: string | null;
}

export interface PreparedEventRequestData
  extends Omit<EventRequestData, 'date'> {
  date: string | null;
}

export type Events = PaginationResult<Event>;
