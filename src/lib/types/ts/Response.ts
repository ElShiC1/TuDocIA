export interface Response<T> {
    success: boolean,
    message: string,
    timestamp: string,
    code: string,
    status: string,
    data: T
}

export type ErrorResponse<T> = Omit<Response<T>, 'data'> & {
  error: {
    type: string;
    code: string;
    status?: number;
    context?: Record<string, unknown>;
  };
};

export type SuccessResponse<T> = Response<T>;

export type ApiResponse<T> =
  | (SuccessResponse<T> & { success: true })
  | (ErrorResponse<T> & { success: false });

