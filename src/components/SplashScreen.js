// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { ActivityIndicator, Image, View } from 'react-native';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import React, { PureComponent } from 'react';

import styles from 'styles/SplashScreen.style.js';
import User from 'stores/models/User.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';

type TProps = {
    appInitialized: boolean,
    user: User,
    navigation: NavigationScreenProp<NavigationState>,
};

@observer
class SplashScreen extends PureComponent<TProps> {
    componentDidMount() {
        this.checkInitialized();
    }

    componentDidUpdate() {
        this.checkInitialized();
    }

    checkInitialized = () => {
        if (this.props.appInitialized) {
            const route = this.props.user == null ? 'Login' : 'Projects';
            this.props.navigation.replace(route);
        }
    };

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

export default withNavigation(SplashScreen);
