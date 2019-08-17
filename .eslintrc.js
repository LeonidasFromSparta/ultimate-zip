module.exports = {

    parser: 'babel-eslint',
    env: {
        node: true,
        es6: true,
        jest: true
    },
    plugins: ['babel'],
    extends: ['eslint:recommended'],
    rules: {
        'semi': [2, 'never'],
        'no-console': 'off',
        'no-debugger': 'off',
        'max-len': [2, 120, 4]
    }
}
