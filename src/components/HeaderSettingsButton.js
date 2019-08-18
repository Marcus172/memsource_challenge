// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import React, { PureComponent } from 'react';

import styles from 'styles/HeaderSettingsButton.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';

type TProps = {
    navigation: NavigationScreenProp<NavigationState>,
};

class HeaderSettingsButton extends PureComponent<TProps> {
    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Settings')}
            >
                <Image
                    style={styles.image}
                    source={require('assets/settings.png')}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

export default withNavigation(HeaderSettingsButton);
