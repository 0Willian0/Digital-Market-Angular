export interface User {
  id?: number;
  name: string;
  email: string;
  balance: number;
  imageUrl?: string;
  admin?: boolean;
  password?: string;
  confirmPassword?: string;
}
