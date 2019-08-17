module.exports = {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    assets: './src/assets',
                    components: './src/components',
                    config: './src/config',
                    containers: './src/containers',
                    managers: './src/managers',
                    stores: './src/stores',
                    styles: './src/styles',
                },
            },
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
};
