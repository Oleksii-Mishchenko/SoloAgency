import { PaginationConfig } from './PaginationConfig';

export interface Project {
  id: number;
  title: string;
  description: string;
  photo: File | null;
}

export type NewProject = Omit<Project, 'id'>;

export interface Portfolio extends PaginationConfig {
  results: Project[];
}
