export default {
    env: {
        browser: true,
        es2021: true,
        node: true,  // Recognize Node.js global variables
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
    ],
    rules: {
        // Your custom rules
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};