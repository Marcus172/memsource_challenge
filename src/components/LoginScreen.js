// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import React, { PureComponent } from 'react';

import apiManager from 'managers/apiManager.js';
import appManager from 'managers/appManager.js';
import appConfig from 'config/appConfig.js';
import Button from 'components/Button.js';
import styles from 'styles/LoginScreen.style.js';

import type { TLoginResponse } from 'config/types.js';

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
        this.setState({ loading: true, error: null }, () => {
            apiManager
                .login(this.state.username, this.state.password)
                .then((response: TLoginResponse) => {
                    if (response != null && response.data != null) {
                        appManager.userLogged({
                            ...response.data.user,
                            token: response.data.token,
                            tokenExpiresIn: response.data.expires,
                        });
                    } else {
                        this.setState({
                            error: response.message,
                            loading: false,
                        });
                    }
                })
                .catch((e: Error) => {
                    console.warn(
                        'Unexpected Error occurred during login promise',
                        e,
                    );
                    this.setState({ error: 'Unknown error', loading: false });
                });
        });
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
                <Text style={styles.errorText}>
                    {this.state.error}. Please try again.
                </Text>
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
                                autoCapitalize="none"
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
                            <Button
                                label="Login"
                                onPress={this.submit}
                                disabled={!this.isLoginButtonEnabled()}
                                loading={this.state.loading}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginScreen;
