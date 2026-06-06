import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
);