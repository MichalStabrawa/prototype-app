module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
    plugins: [
      'react-hooks',
      "import"
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'import/no-anonymous-default-export': 'error'
    }
  };