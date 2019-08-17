// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { PureComponent } from 'react';

import appConfig from 'config/appConfig.js';
import styles from 'styles/LoginScreen.style.js';

type TProps = {};
type TState = {
    loading: boolean,
    username: string,
    password: string,
    error: string | null,
};

class LoginScreen extends PureComponent<TProps, TState> {
    constructor(props: TProps) {
        super(props);

        this.state = {
            loading: false,
            username: '',
            password: '',
            error: null,
        };
    }

    submit = () => {
        this.setState({ error: 'error' });
    };

    isLoginButtonEnabled = () => {
        return (
            !this.state.loading &&
            this.state.username.length > 0 &&
            this.state.password.length > 0
        );
    };

    renderError = () => {
        if (this.state.error == null) {
            return null;
        }

        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{this.state.error}</Text>
            </View>
        );
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.containerView}
                behavior="padding"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Image
                                style={styles.logo}
                                source={require('assets/logo.png')}
                                resizeMode="contain"
                            />
                            <Text style={styles.logoText}>
                                {appConfig.displayName}
                            </Text>
                            <TextInput
                                placeholder="Username"
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput}
                                onChangeText={username =>
                                    this.setState({ username })
                                }
                                value={this.state.username}
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput}
                                secureTextEntry={true}
                                onChangeText={password =>
                                    this.setState({ password })
                                }
                                value={this.state.password}
                            />
                            {this.renderError()}
                            <TouchableOpacity
                                style={
                                    this.isLoginButtonEnabled()
                                        ? styles.loginButton
                                        : styles.loginButtonDisabled
                                }
                                onPress={
                                    this.isLoginButtonEnabled()
                                        ? this.submit
                                        : null
                                }
                                activeOpacity={
                                    this.isLoginButtonEnabled() ? 0.2 : 1
                                }
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginScreen;
