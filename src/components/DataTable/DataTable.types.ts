import React from 'react';

export interface Column<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  className?: string;
}

export interface SortConfig<T = Record<string, unknown>> {
  key: keyof T;
  direction: 'asc' | 'desc';
}
