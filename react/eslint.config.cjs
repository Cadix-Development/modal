const {
    defineConfig,
} = require("eslint/config");

const {
    fixupConfigRules,
    fixupPluginRules,
} = require("@eslint/compat");

const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const prettier = require("eslint-plugin-prettier");
const unusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
    )),

    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        prettier,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        sourceType: "module",
        ecmaVersion: 2022,
        parserOptions: {},

        globals: {
            ...globals.browser,
        },
    },

    rules: {
        "react/prop-types": 0,
        "react-hooks/exhaustive-deps": "off",

        "prettier/prettier": ["error", {
            usePrettierrc: true,
        }],

        "tailwindcss/no-custom-classname": "off",
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}]);
