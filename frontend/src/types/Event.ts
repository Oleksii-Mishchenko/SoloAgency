import { PaginationResult } from './PaginationConfig';

export type EventStatus = 'created' | 'done' | 'in_progress' | 'rejected';

export interface Event {
  id: number;
  customer: string;
  event_name: string;
  service_name: string;
  description: string;
  number_of_guests: number;
  event_type_name: string;
  date: Date;
  style: string;
  city: string;
  venue: string;
  phone: string;
  status: EventStatus;
}

export interface EventRequestData {
  city: string;
  phone: string;
  date: Date;
  service: number;
  description: string;
  number_of_guests: number;
  event_type: number;
  style: string;
  venue: string;
}

export interface PreparedEventRequestData
  extends Omit<EventRequestData, 'date'> {
  date: string;
}

export type Events = PaginationResult<Event>;
