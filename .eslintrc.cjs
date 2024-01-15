module.exports = {
  extends: ["pink", "prettier"],
  rules: {
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/no-array-index-key": 1,
    "react/jsx-one-expression-per-line": 0,
    "object-curly-newline": 0,
    "react/jsx-wrap-multilines": 0,
    "react/no-unstable-nested-components": 0,
    "comma-dangle": 0,
    "react/destructuring-assignment": 1,
    "no-param-reassign": 1,
    "no-plusplus": 1,
    "jsx-a11y/alt-text": 0,
    "no-nested-ternary": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "no-shadow": 1,
    "no-use-before-define": 0,
    "react/jsx-closing-tag-location": 0,
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": false,
        "allowedNames": ["self"]
      }
    ],
    "camelcase": 0,
    "react/function-component-definition": 0,
    "@typescript-eslint/no-explicit-any": 0
  },
};