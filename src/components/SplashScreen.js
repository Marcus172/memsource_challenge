// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { ActivityIndicator, Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/SplashScreen.style.js';

type TProps = {};

class SplashScreen extends PureComponent<TProps> {
    render() {
        return (
            <View>
                <Text>This is splash screen</Text>
                <ActivityIndicator />
            </View>
        );
    }
}

export default SplashScreen;
