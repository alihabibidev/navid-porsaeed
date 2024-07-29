export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}
export const userRoleToUp = [Role.SUPER_ADMIN, Role.ADMIN, Role.USER];
export const adminRoleToUp = [Role.SUPER_ADMIN, Role.ADMIN];
