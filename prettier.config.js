// Copyright (c) 2019, Marek Rom, All rights reserved.

module.exports = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    overrides: [
        {
            files: '*.js',
            options: {
                parser: 'flow',
            },
        },
    ],
};
