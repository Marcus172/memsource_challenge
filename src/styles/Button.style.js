// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { StyleSheet } from 'react-native';

import colors from 'styles/colors.js';

export default StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: colors.buttonDisabledBackgroundColor,
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white,
        alignSelf: 'center',
    },
});
