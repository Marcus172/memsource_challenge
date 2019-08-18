// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { DataTable } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import React, { PureComponent } from 'react';

import Project from 'stores/models/Project.js';
import styles from 'styles/ProjectsScreen.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';

type TProps = {
    projects: Array<Project>,
    navigation: NavigationScreenProp<NavigationState>,
};

class ProjectsScreen extends PureComponent<TProps> {
    keyExtractor = (item: Project, index: number) =>
        `project_${item.name}_${index}`;

    crateOnPressProject = (project: Project) => {
        return () => {
            this.props.navigation.navigate('Detail', { project });
        };
    };

    renderHeader = () => {
        return (
            <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Source Lang</DataTable.Title>
                <DataTable.Title>Target Lang</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>
        );
    };

    renderProject = ({ item, index }: { item: Project, index: number }) => {
        return (
            <TouchableOpacity onPress={this.crateOnPressProject(item)}>
                <DataTable.Row>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.sourceLang}</DataTable.Cell>
                    <DataTable.Cell>
                        {item.targetLangs.join(', ')}
                    </DataTable.Cell>
                    <DataTable.Cell>{item.status}</DataTable.Cell>
                </DataTable.Row>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <DataTable>
                <FlatList
                    data={this.props.projects}
                    renderItem={this.renderProject}
                    keyExtractor={this.keyExtractor}
                    contentContainerStyle={styles.container}
                    ListHeaderComponent={this.renderHeader}
                />
            </DataTable>
        );
    }
}

export default withNavigation(ProjectsScreen);
