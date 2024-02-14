import { Tab } from './Tab';

export enum OrderType {
  Event = 'events',
  CallRequest = 'callRequests',
}

export type OrderTabs = {
  [key in OrderType]: Tab;
};
