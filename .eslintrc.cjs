module.exports = {
  env: { browser: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  overrides: [
    // Turned off these rules for test files so that the linter output
    // isn't so noisy about tests. Remove "overrides" if you want to re-enable
    {
      files: ['*.test.*', '*.spec.*'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  ignorePatterns: ['**/*.json', '**/*.md', '**/*.yaml', 'node_modules', 'dist'],
};
