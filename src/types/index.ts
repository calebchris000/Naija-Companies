export type ResponseType = {
  statusCode: 0 | 1 | 2 | 3;
  message?: string;
  data?: string | object | number;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string | null;
  id: string;
};

