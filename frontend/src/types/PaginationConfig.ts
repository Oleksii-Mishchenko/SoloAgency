export interface PaginationConfig {
  num_pages: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
}

export interface PaginationResult<T> extends PaginationConfig {
  results: T[];
}
