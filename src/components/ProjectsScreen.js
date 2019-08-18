// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { Text, View } from 'react-native';
import React, { PureComponent } from 'react';

import Project from 'stores/models/Project.js';
import styles from 'styles/ProjectsScreen.style.js';

type TProps = {
    projects: Array<Project>,
};

class ProjectsScreen extends PureComponent<TProps> {
    render() {
        return (
            <View>
                <Text>This is projects screen</Text>
                <Text>{JSON.stringify(this.props.projects)}</Text>
            </View>
        );
    }
}

export default ProjectsScreen;
