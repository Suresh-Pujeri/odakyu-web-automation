const adminUser = 'adminUser';
const superAdminUser = 'superAdminUser';

export const userRoleAccessMatrix = {
  allUsers: [adminUser, superAdminUser],
  adminOnly: [adminUser],
  superAdminOnly: [superAdminUser],
};
