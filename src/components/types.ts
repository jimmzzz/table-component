export interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface TableData {
  [key: string]: string | number | boolean;
}
