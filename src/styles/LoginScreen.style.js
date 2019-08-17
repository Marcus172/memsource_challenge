// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { StyleSheet } from 'react-native';

import colors from 'styles/colors.js';

export default StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    logo: {
        marginTop: 70,
        width: '100%',
    },
    logoText: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 30,
        textAlign: 'center',
        color: colors.dark,
    },
    loginFormView: {
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.textInputBorderColor,
        backgroundColor: colors.textInputBackgroundColor,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: colors.buttonBackgroundColor,
        borderRadius: 5,
        height: 45,
        marginTop: 20,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        justifyContent: 'center',
    },
    loginButtonDisabled: {
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
    errorContainer: {
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.errorBackground,
        borderRadius: 5,
    },
    errorText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.white,
    },
});
