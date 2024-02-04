import { PaginationResult } from './PaginationConfig';

export interface Project {
  id: number;
  title: string;
  description: string;
  photo: string;
}

export interface NewProject {
  title: string;
  description: string;
  photo: File | null;
}

export type Portfolio = PaginationResult<Project>;
