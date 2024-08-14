export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}
export const userRoleToUp = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.EDITOR,
  Role.USER,
];
export const editorRoleToUp = [Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR];
export const adminRoleToUp = [Role.SUPER_ADMIN, Role.ADMIN];
