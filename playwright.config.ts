// export default config;
import { PlaywrightTestConfig, defineConfig } from '@playwright/test';

export const baseURLRouteware = process.env.URL || 'https://hauler.qa.ap.odakyu.smartcity.routeware.com/';

const baseConfig: PlaywrightTestConfig = {
  timeout: 240000, // 4 minutes - allows for comprehensive CRUD tests with multiple user roles
  retries: 1,
  outputDir: `./test-results/${Date.now()}/`,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    launchOptions: { slowMo: 0 }, // Removed slowMo for faster execution
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};

const projects = [
  // fullyParallel: true runs tests in parallel regardless of file
  // fullyParallel: false (default) parallelizes by test file
  { ...baseConfig, name: 'setup', testMatch: /global-setup/, fullyParallel: true },
  // fullParallel: true causes more tests to be flaky nullifying any potential speed gains
  {
    ...baseConfig,
    name: 'RouteWareTests',
    testMatch: '/odakyuPortal/test/*.spec.ts',
    use: { ...baseConfig.use, baseURL: baseURLRouteware },
    dependencies: ['setup'],
    fullyParallel: false,
  },
];

export default defineConfig({
  reporter: [['list',''], ['html', { outputFolder: 'test-results/html-report' }], ['json', { outputFile: 'test-results/test-results.json' }]],
  workers: 2,
  projects,
});
