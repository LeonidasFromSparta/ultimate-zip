module.exports = {
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
    },
    env: {
        node: true
    },
    plugins: ['babel']
    extends: ['eslint:recommended'],
    rules: {
        'semi': [2, 'never'],
        'no-console': 'off',
        'no-debugger': 'off'
    }
}
