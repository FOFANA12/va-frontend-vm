module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',       // règles de base Vue 3
    'eslint:recommended',               // règles recommandées par ESLint
    '@vue/eslint-config-prettier'       // désactive les règles ESLint incompatibles avec Prettier
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // vos personnalisations ici, par exemple :
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/multi-word-component-names': 'off',
  },
}
