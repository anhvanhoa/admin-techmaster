/* eslint-env node */

module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Add this line
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh', 'prettier'], // Add "prettier" here
    rules: {
        'react-refresh/only-export-components': 'warn',
        'prettier/prettier': 'error', // Add this line
    },
};
