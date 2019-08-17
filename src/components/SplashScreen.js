// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { ActivityIndicator, Image, View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/SplashScreen.style.js';

type TProps = {};

class SplashScreen extends PureComponent<TProps> {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('assets/logo.png')}
                    resizeMode="contain"
                />
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default SplashScreen;
