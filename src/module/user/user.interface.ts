export interface IUser {
  id: number;
  first_name?: string;
  last_name?: string;
  user_name: string;
  password: string;
  email?: string;
  mobile?: boolean;
  created_at: Date;
  updated_at: Date;
}
