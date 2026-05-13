// eslint-disable-next-line no-undef
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:playwright/playwright-test',
    'plugin:jest/recommended',
    'plugin:jest/style',
    A,
  ],
  env: {
    'jest/globals': true,
  },
  rules: {
    'jest/no-standalone-expect': 'off', // NOTE: unfortunately this particular rule throws errors inappropriately
    'playwright/no-networkidle': 'warn', // TODO: fix that later for networkidle
  },
  settings: {
    jest: {
      version: 27,
    },
  },
};
