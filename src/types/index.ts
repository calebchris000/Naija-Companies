export type ResponseType = {
  statusCode: 0 | 1 | 2 | 3;
  message?: string;
  data?: string | object | number | any;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  role?: "admin" | "user" | "sub-admin";
  userName: string | null;
  id: string;
};

export type OrganizationsType = {
  id: string;
  image: string;
  name: string;
  type: string;
  average: number;
  website: string;
  description: string;
  verified: boolean;
};
export type OrganizationDetailType = {
  id: string;
  name: string;
  city?: string;
  postalCode?: string;
  website: string;
  email?: string;
  foundedYear?: string;
  size?: string;
  industry: string;
  description: string;
  verified: boolean;
  addedById?: string;
  logoUrl: string;
  average: number;
  capitalId?: string;
};

export type ReviewType = {
  id: string;
  title: string;
  content: string;
  rating: number;
  reviewer: any;
  isEmployee: boolean;
  organizationId?: string;
  agreed?: number;
  verified: boolean;
};
