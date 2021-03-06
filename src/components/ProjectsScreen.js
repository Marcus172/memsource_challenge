// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import {
    ActivityIndicator,
    FlatList,
    Platform,
    TouchableOpacity,
    View,
} from 'react-native';
import { DataTable, Divider, Headline } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import Picker from 'react-native-picker-select';
import React, { PureComponent } from 'react';
import Slider from '@react-native-community/slider';

import appManager from 'managers/appManager.js';
import colors from 'styles/colors.js';
import Project from 'stores/models/Project.js';
import styles from 'styles/ProjectsScreen.style.js';

import type { NavigationScreenProp, NavigationState } from 'react-navigation';
import type { TFilterItem, TPickerItem } from 'config/types.js';

type TProps = {
    projects: Array<Project>,
    filterItems: Array<TFilterItem>,
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
    constructor(props: TProps) {
        super(props);

        this.state = {
            filterValue: null,
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
        return this.props.filterItems.map(
            (item: TFilterItem): TPickerItem => {
                return {
                    label: `${item.dueInHours} hours`,
                    value: item.projectId,
                    key: `picker_key_${item.projectId}`,
                };
            },
        );
    };

    getSliderValue = () => {
        return (
            (this.state.filterValue &&
                this.props.filterItems.findIndex((item: TFilterItem) => {
                    return item.projectId === this.state.filterValue.projectId;
                })) ||
            0
        );
    };

    loadMoreProjects = () => {
        appManager.loadMoreProjects();
    };

    submitFilter = () => {
        this.state.filterValue != null &&
            appManager.submitProjectsFilter(this.state.filterValue);
    };

    pickerOnValueChanged = (filterValue: string) => {
        const filterItem = this.props.filterItems.find(
            (item: TFilterItem) => item.projectId === filterValue,
        );

        this.setState(
            {
                filterValue: filterItem,
            },
            () => {
                if (Platform.OS === 'android') {
                    this.submitFilter();
                }
            },
        );
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

    renderFilter = () => {
        if (this.props.filterItems.length < 1) {
            return <ActivityIndicator />;
        }

        return (
            <View style={styles.filterContainer}>
                <Headline style={styles.filterHeadline}>
                    {`Filter due hours from ${
                        this.props.filterItems[0].dueInHours
                    }h to ${
                        this.props.filterItems[
                            this.props.filterItems.length - 1
                        ].dueInHours
                    }h`}
                </Headline>
                <Slider
                    style={styles.filterSlider}
                    minimumValue={0}
                    maximumValue={this.props.filterItems.length - 1}
                    value={this.getSliderValue()}
                    step={1}
                    onValueChange={filterValueIndex =>
                        this.setState({
                            filterValue: this.props.filterItems[
                                filterValueIndex
                            ],
                        })
                    }
                    onSlidingComplete={this.submitFilter}
                    minimumTrackTintColor={colors.dark}
                    maximumTrackTintColor={colors.primary}
                />
                <Picker
                    style={filterPickerConfigStyle}
                    onValueChange={this.pickerOnValueChanged}
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
                    onDonePress={this.submitFilter}
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
