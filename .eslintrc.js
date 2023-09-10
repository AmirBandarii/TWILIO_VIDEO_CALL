module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sonarjs', 'security'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
  ],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'max-lines-per-function': [
          'error',
          {
            max: 100,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
          },
        ],
      },
    },
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist', '.eslintrc.js', 'twilio-serverless-video/functions/get_token.js'],
  rules: {
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['enum', 'enumMember'],
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-restricted-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'max-lines': ['error', 600],
    'max-params': ['error', { max: 3 }],
    'max-lines-per-function': [
      'error',
      {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    'no-console': 'error',
  },
}
