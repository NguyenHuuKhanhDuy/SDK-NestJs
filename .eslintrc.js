module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'unused-imports',
    'typescript-sort-keys',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'all', endOfLine: 'auto' },
    ],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'typescript-sort-keys/interface': 'off',
    'typescript-sort-keys/string-enum': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 0,
    'semi-spacing': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-duplicate-imports': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    'max-lines-per-function': [
      'warn',
      { max: 250, skipBlankLines: true, skipComments: true },
    ],
    'max-lines': [
      'warn',
      { max: 1000, skipBlankLines: true, skipComments: true },
    ],
    'max-depth': ['warn', 3],
    'max-params': ['warn', 4],
    'no-useless-catch': 'error',
    'consistent-return': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
      },
      { selector: 'class', format: ['PascalCase'] },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],
  },
};
