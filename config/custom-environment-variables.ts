import { RoutewarePlaywrightTestsConfig } from '../typings/RoutewarePlaywrightTestsConfig';

const customEnvironmentVariables: RoutewarePlaywrightTestsConfig = {
  adminUser: {
    email: 'TEST_ADMIN_USER',
    password: 'TEST_ADMIN_PASSWORD',
    vendorName: 'TEST_ADMIN_USER_VENDOR_NAME',
  },
  superAdminUser: {
    email: 'TEST_SUPER_ADMIN_USER',
    password: 'TEST_SUPER_ADMIN_PASSWORD',
    vendorName: 'TEST_SUPER_ADMIN_USER_VENDOR_NAME',
  },
};
export default customEnvironmentVariables;
