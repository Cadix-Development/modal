const {
    defineConfig,
} = require("eslint/config");

const prettier = require("eslint-plugin-prettier");
const unusedImports = require("eslint-plugin-unused-imports");
const parser = require("vue-eslint-parser");
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
    extends: compat.extends(
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:tailwindcss/recommended",
        "prettier",
    ),

    plugins: {
        prettier,
        "unused-imports": unusedImports,
    },

    languageOptions: {
        sourceType: "module",
        ecmaVersion: 2022,
        parserOptions: {},
        parser: parser,
    },

    rules: {
        "prettier/prettier": ["error", {
            usePrettierrc: true,
        }],

        "vue/require-default-prop": 0,
        "vue/no-v-html": "off",
        "vue/multi-word-component-names": "off",
        "vue/no-parsing-error": "warn",
        "tailwindcss/no-custom-classname": "off",
    },
}]);
