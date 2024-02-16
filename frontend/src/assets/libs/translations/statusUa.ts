import { EventStatus } from '../../../types/Event';

export const statusUa: Record<EventStatus, string> = {
  created: 'Створено',
  in_progress: 'Виконується',
  done: 'Виконано',
  rejected: 'Відхилено',
};
