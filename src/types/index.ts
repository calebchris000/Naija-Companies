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
  verified: boolean;
  website: string;
  industry: {
    name: string;
  };
  postalCode?: string;
  email?: string;
  foundedYear?: string;
  size?: string;
  description: string;
  addedById?: string;
  capitalId?: string;
  logoUrl: string;
  average: number;
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
