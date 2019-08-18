// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/SettingsScreen.style.js';

type TProps = {};

class SettingsScreen extends PureComponent<TProps> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
            </View>
        );
    }
}

export default SettingsScreen;
