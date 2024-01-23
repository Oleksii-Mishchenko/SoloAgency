export interface UserEvent {
  id: number;
  service: number;
  description: string;
  number_of_guests: number;
  event_type: number;
  date: Date;
  style: string;
  city: string;
  venue: string;
  phone: string;
  status: string;
}
