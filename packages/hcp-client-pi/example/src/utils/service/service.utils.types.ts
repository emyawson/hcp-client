export type ErrorResponseBody<ErrorCode = any> = {
  url: string;
  errorCode?: ErrorCode;
  status: number;
  statusText: string;
};
