export interface RoutewarePlaywrightTestsConfig {
  adminUser?: {
    email: string;
    password: string;
    vendorName: string;
  };
  superAdminUser?: {
    email: string;
    password: string;
    vendorName: string;
  };
}
