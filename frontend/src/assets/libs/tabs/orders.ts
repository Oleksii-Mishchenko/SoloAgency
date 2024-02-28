import { OrderTabs, OrderType } from '../../../types/OrderType';

export const orderTabs: OrderTabs = {
  [OrderType.Event]: { id: 1, title: 'Події', path: 'events' },

  [OrderType.CallRequest]: {
    id: 0,
    title: 'Дзвінки',
    path: 'callRequests',
  },
};
