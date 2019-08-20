// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native';
import { DataTable, Divider, Headline } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Picker from 'react-native-picker-select';
import React, { PureComponent } from 'react';
import Slider from '@react-native-community/slider';

import appManager from 'managers/appManager.js';
import Project from 'stores/models/Project.js';
import styles from 'styles/ProjectsScreen.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';
import type { TFilterItem, TPickerItem } from 'config/types.js';
import colors from 'styles/colors.js';

type TProps = {
    projects: Array<Project>,
    navigation: NavigationScreenProp<NavigationState>,
};

type TState = {
    filterItems: Array<TFilterItem>,
    filterValue: TFilterItem | null,
};

const filterPickerConfigStyle = {
    viewContainer: {
        marginRight: 20,
        marginLeft: 20,
    },
};

class ProjectsScreen extends PureComponent<TProps, TState> {
    static getDerivedStateFromProps(props: TProps, state: TState) {
        return {
            filterValue: state.filterValue,
            filterItems: ProjectsScreen.generateFilterItems(props.projects),
        };
    }

    static generateFilterItems = (
        projects: Array<Project> | null,
    ): Array<TFilterItem> => {
        if (projects == null) {
            return [];
        }

        const values = projects.map((project: Project, index: number) => {
            return {
                projectId: project.id,
                dueInHours: project.dueInHours,
            };
        });

        values.sort(
            (a: TFilterItem, b: TFilterItem) => a.dueInHours - b.dueInHours,
        );

        return values.filter((value: TFilterItem) => value.dueInHours != null);
    };

    constructor(props: TProps) {
        super(props);

        this.state = {
            filterValue: null,
            filterItems: [],
        };
    }

    keyExtractor = (item: Project, index: number) =>
        `project_${item.name}_${index}`;

    crateOnPressProject = (project: Project) => {
        return () => {
            this.props.navigation.navigate('Detail', { project });
        };
    };

    generatePickerItems = (): Array<TPickerItem> => {
        return this.state.filterItems.map(
            (item: TFilterItem): TPickerItem => {
                return {
                    label: `${item.dueInHours} hours`,
                    value: item.projectId,
                    key: `picker_key_${item.projectId}`,
                };
            },
        );
    };

    loadMoreProjects = () => {
        appManager.loadMoreProjects();
    };

    renderHeader = () => {
        return (
            <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Source Lang</DataTable.Title>
                <DataTable.Title>Target Lang</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>
        );
    };

    getSliderValue = () => {
        return (
            (this.state.filterValue &&
                this.state.filterItems.findIndex((item: TFilterItem) => {
                    return item.projectId === this.state.filterValue.projectId;
                })) ||
            0
        );
    };

    renderFilter = () => {
        if (this.state.filterItems.length < 1) {
            return <ActivityIndicator />;
        }

        return (
            <View style={styles.filterContainer}>
                <Headline style={styles.filterHeadline}>
                    {`Filter due hours from ${
                        this.state.filterItems[0].dueInHours
                    }h to ${
                        this.state.filterItems[
                            this.state.filterItems.length - 1
                        ].dueInHours
                    }h`}
                </Headline>
                <Slider
                    style={styles.filterSlider}
                    minimumValue={0}
                    maximumValue={this.state.filterItems.length - 1}
                    value={this.getSliderValue()}
                    step={1}
                    onValueChange={filterValueIndex =>
                        this.setState({
                            filterValue: this.state.filterItems[
                                filterValueIndex
                            ],
                        })
                    }
                    minimumTrackTintColor={colors.dark}
                    maximumTrackTintColor={colors.primary}
                />
                <Picker
                    style={filterPickerConfigStyle}
                    onValueChange={filterValue => {
                        this.setState({
                            filterValue: this.state.filterItems.find(
                                (item: TFilterItem) =>
                                    item.projectId === filterValue,
                            ),
                        });
                    }}
                    placeholder={{
                        label: 'Select due date',
                        key: 'picker_key_placeholder',
                        value: null,
                    }}
                    items={this.generatePickerItems()}
                    value={
                        (this.state.filterValue &&
                            this.state.filterValue.projectId) ||
                        null
                    }
                />
            </View>
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
                {this.renderFilter()}
                <Divider />
                <Headline style={styles.filterHeadline}>
                    List of projects
                </Headline>
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
                        stickyHeaderIndices={[0]}
                    />
                </DataTable>
            </View>
        );
    }
}

export default withNavigation(ProjectsScreen);
