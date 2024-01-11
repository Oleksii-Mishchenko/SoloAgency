export interface EventType {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface EventTypesPage {
  num_pages: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: EventType[];
}
