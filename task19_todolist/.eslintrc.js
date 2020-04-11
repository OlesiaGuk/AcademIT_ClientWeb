module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [1, "always"],
    'indent': "off",
    'quotes': ["warn", "double"],
    "space-before-function-paren": "off",
    "spaced-comment": "off",
    "object-curly-spacing": "warn",
    "no-multiple-empty-lines": "warn",
    "no-trailing-spaces": "warn"
  }
};
