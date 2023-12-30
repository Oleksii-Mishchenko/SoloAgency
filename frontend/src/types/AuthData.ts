import { User } from './User';

export interface AuthData {
  token: string | null;
  user: User | null;
}
