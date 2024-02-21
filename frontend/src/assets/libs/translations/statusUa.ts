import { OrderStatus } from '../../../types/OrderStatus';
import { SelectOption } from '../../../types/SelectOption';

export const statusUa: Record<OrderStatus, string> = {
  created: 'Новий',
  in_progress: 'Виконується',
  done: 'Виконано',
  rejected: 'Відхилено',
};

const entries: [OrderStatus, string][] = Object.entries(statusUa).map(
  ([key, value]) => [key as OrderStatus, value],
);
export const statusOpts: SelectOption<OrderStatus>[] = entries.map(
  ([value, label]) => ({ value, label }),
);
