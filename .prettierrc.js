/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: 'none',
  singleQuote: true,
  overrides: [
    {
      files: ['tsconfig.json', 'jsconfig.json', 'tsconfig.*.json'],
      options: {
        parser: 'jsonc'
      }
    }
  ]
};
