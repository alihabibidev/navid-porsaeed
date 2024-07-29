export type JwtPayload = {
  id: number;
  role: string;
  user_name: string;
  exp?: number;
};
