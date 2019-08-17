// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/LoginScreen.style.js';

type TProps = {};

class LoginScreen extends PureComponent<TProps> {
    render() {
        return (
            <View>
                <Text>This is login screen</Text>
            </View>
        );
    }
}

export default LoginScreen;
