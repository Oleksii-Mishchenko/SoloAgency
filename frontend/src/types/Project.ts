import { PaginationConfig } from './PaginationConfig';

export interface Project {
  id: number;
  title: string;
  description: string;
  photo: string;
}

export interface Portfolio extends PaginationConfig {
  results: Project[];
}
