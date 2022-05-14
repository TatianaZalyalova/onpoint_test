module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
    "import/prefer-default-export": "off",
    "no-param-reassign": [2, { props: false }],
    "no-useless-escape": "off",
    "import/no-cycle": [0],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "consistent-return": "off",
    "no-else-return": "off",
    "spaced-comment": "off",
    "no-unused-vars": "off",
    "prefer-arrow-callback": "off",
    "prefer-destructuring": "off",
    "no-undef": "off",
    "func-names": "off",
  },
};
