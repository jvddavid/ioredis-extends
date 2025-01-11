import pluginJs from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * @type {import("eslint").Linter.Config<stylisticPlugin.Rules>}
 */
const styleRules = {
  rules: {
    indent: ['error', 2],
    'indent-binary-ops': ['error', 2],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    semi: ['error', 'never'],
    'semi-style': ['error', 'last'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 6
      }
    ],
    'array-element-newline': [
      'error',
      {
        consistent: false,
        multiline: true,
        minItems: 6
      }
    ],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'block-spacing': ['error', 'always'],
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    'computed-property-spacing': ['error', 'never'],
    'dot-location': ['error', 'property'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-call-spacing': ['error', 'never'],
    'generator-star-spacing': ['error', 'after'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'line-comment-position': 'off',
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false
      }
    ],
    'lines-between-class-members': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 240,
        ignoreUrls: true,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'max-statements-per-line': [
      'error',
      {
        max: 1
      }
    ],
    'member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none'
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false
        },
        multilineDetection: 'brackets'
      }
    ],
    'multiline-comment-style': ['error', 'starred-block'],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-parens': ['error', 'always'],
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 2
      }
    ],
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-newline': ['error', 'always'],
    'object-curly-spacing': ['error', 'never'],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false
      }
    ],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': [
      'error',
      {
        blocks: 'never',
        classes: 'never',
        switches: 'never'
      }
    ],
    'rest-spread-spacing': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': ['error', 'always'],
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    'template-curly-spacing': ['error', 'never'],
    'template-tag-spacing': ['error', 'never'],
    'type-annotation-spacing': ['error'],
    'type-generic-spacing': ['error'],
    'type-named-tuple-spacing': ['error'],
    'wrap-iife': ['error', 'inside'],
    'wrap-regex': ['error'],
    'yield-star-spacing': [
      'error',
      {
        before: true,
        after: false
      }
    ],
    'no-confusing-arrow': ['error'],
    'no-extra-parens': [
      'error',
      'all',
      {
        conditionalAssign: true,
        returnAssign: true,
        nestedBinaryExpressions: true,
        ternaryOperandBinaryExpressions: true,
        ignoreJSX: 'multi-line',
        enforceForArrowConditionals: false,
        enforceForSequenceExpressions: true,
        enforceForNewInMemberExpressions: false,
        enforceForFunctionPrototypeMethods: false
      }
    ],
    'no-extra-semi': ['error'],
    'no-floating-decimal': ['error'],
    'no-mixed-operators': ['off'],
    'no-mixed-spaces-and-tabs': ['error'],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0
      }
    ],
    'no-tabs': ['error'],
    'no-trailing-spaces': ['error'],
    'no-whitespace-before-property': ['error']
  }
}

const stylistic = [
  Object.entries(styleRules.rules).reduce(
    (acc, [rule, config]) => {
      acc.rules[`@stylistic/${rule}`] = config
      return acc
    },
    {
      plugins: {
        '@stylistic': stylisticPlugin
      },
      rules: {
      }
    }
  )
]

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigDirName: import.meta.url
      }
    }
  },
  {
    files: ['**/*.{js,mjs}'],
    ...tseslint.configs.disableTypeChecked
  },
  ...stylistic,
  {
    rules: {
      '@typescript-eslint/unified-signatures': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off'
    }
  }
]
