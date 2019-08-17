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
import Button from 'react-native-spinner-button';
import React, { PureComponent } from 'react';

import appConfig from 'config/appConfig.js';
import styles from 'styles/LoginScreen.style.js';

type TProps = {};

class LoginScreen extends PureComponent<TProps> {
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
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderColor="#c4c3cb"
                                style={styles.loginFormTextInput}
                                secureTextEntry={true}
                            />
                            <Button
                                buttonStyle={styles.loginButton}
                                isLoading={false}
                                onPress={() => {
                                    // this.setState({ defaultLoading: true });
                                }}
                                indicatorCount={10}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginScreen;
