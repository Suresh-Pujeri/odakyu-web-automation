import { RoutewarePlaywrightTestsConfig } from '../typings/RoutewarePlaywrightTestsConfig';

const defaultConfig: RoutewarePlaywrightTestsConfig = {
  adminUser: {
    email: '',
    password: '',
    vendorName: ',',
  },
  superAdminUser: {
    email: '',
    password: '',
    vendorName: '',
  },
};
export default defaultConfig;
