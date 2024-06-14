export type ResponseType = {
  statusCode: 0 | 1 | 2 | 3;
  message?: string;
  data?: string | object | number;
};
