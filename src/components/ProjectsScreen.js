// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native';
import { DataTable, Divider } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import React, { PureComponent } from 'react';

import appManager from 'managers/appManager.js';
import Project from 'stores/models/Project.js';
import styles from 'styles/ProjectsScreen.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';

type TProps = {
    projects: Array<Project>,
    navigation: NavigationScreenProp<NavigationState>,
};

class ProjectsScreen extends PureComponent<TProps, TState> {
    keyExtractor = (item: Project, index: number) =>
        `project_${item.name}_${index}`;

    crateOnPressProject = (project: Project) => {
        return () => {
            this.props.navigation.navigate('Detail', { project });
        };
    };

    loadMoreProjects = () => {
        appManager.loadMoreProjects();
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
            <View styles={styles.container}>
                <Divider />
                <DataTable style={styles.table}>
                    <FlatList
                        data={this.props.projects}
                        renderItem={this.renderProject}
                        keyExtractor={this.keyExtractor}
                        ListHeaderComponent={this.renderHeader}
                        ListEmptyComponent={<ActivityIndicator />}
                        onEndReached={this.loadMoreProjects}
                        onEndReachedThreshold={1}
                        contentContainerStyle={styles.flatlist}
                    />
                </DataTable>
            </View>
        );
    }
}

export default withNavigation(ProjectsScreen);
