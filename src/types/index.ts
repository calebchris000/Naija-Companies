export type ResponseType = {
  statusCode: 0 | 1 | 2 | 3;
  message?: string;
  data?: string | object | number | any;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  role?: "admin" |"user" | "sub-admin";
  userName: string | null;
  id: string;
};

