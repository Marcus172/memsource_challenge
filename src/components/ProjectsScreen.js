// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from 'styles/ProjectsScreen.style.js';

type TProps = {};

class ProjectsScreen extends PureComponent<TProps> {
    render() {
        return (
            <View>
                <Text>This is projects screen</Text>
            </View>
        );
    }
}

export default ProjectsScreen;
