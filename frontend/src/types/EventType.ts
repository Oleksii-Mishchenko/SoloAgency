import { DropdownObject } from './DropdownObject';
import { PaginationResult } from './PaginationConfig';

export interface EventType extends DropdownObject {
  description: string;
  photo: string;
}

export interface NewEventType {
  name: string;
  description: string;
  photo: File | null;
}

export type EventTypes = PaginationResult<EventType>;
