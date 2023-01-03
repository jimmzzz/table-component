export interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface TableData {
  [key: string]: string | number | boolean;
}

export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'dsc',
}

export type SortOptions = [SortOrder, String];
