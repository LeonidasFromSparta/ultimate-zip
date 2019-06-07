module.exports = (api) => {

    api.cache(true)

    const presets = [['@babel/preset-env', {targets: {node: true}}]]
    const plugins = ['@babel/plugin-proposal-class-properties']

    return {
        presets,
        plugins
    }
}
