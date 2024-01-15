export type TypeResponse<T> =
  | {
      code: string;
      data: null;
      message: string;
      success: false;
    }
  | {
      code: string;
      data: T;
      message: string;
      success: true;
    };

export type TypeListResponse<T> = TypeResponse<{
  list?: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}>;
export interface IListSort {
  sortBy?: string;
  sortOrder?: string;
}
