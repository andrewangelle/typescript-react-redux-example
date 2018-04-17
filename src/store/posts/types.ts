export interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface TableFilters {
  filterBy: string;
  currentValue: string | number;
  data?: Array<any>;
  userIdValues?: Array<number>;
  idValues?: Array<number>;
}


export interface PostState {
  loading: boolean;
  error: null | Error;
  data: object;
  filters: TableFilters
}
