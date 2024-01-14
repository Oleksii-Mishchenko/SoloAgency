import { PaginationConfig } from './PaginationConfig';

export interface EventType {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface EventTypes extends PaginationConfig {
  results: EventType[];
}
