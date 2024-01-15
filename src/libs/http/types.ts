export type Response<T> =
  | {
      success: true;
      code: string | number;
      message: string;
      data: T;
    }
  | { success: false; data: null; code: string | number; message: string };
