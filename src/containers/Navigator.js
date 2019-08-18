// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { createAppContainer, createStackNavigator } from 'react-navigation';
import React from 'react';

import LoginScreen from 'components/LoginScreen.js';
import HeaderSettingsButton from 'components/HeaderSettingsButton.js';
import ProjectsScreenContainer from 'containers/ProjectsScrenContainer.js';
import SplashScreen from 'components/SplashScreen.js';
import SettingsScreen from 'components/SettingsScreen.js';
import DetailScreen from 'components/DetailScreen.js';

const AppNavigator = createStackNavigator(
    {
        Projects: {
            screen: ProjectsScreenContainer,
            navigationOptions: {
                title: 'Projects',
                headerRight: <HeaderSettingsButton />,
            },
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null,
            },
        },
        Splash: {
            screen: SplashScreen,
            navigationOptions: {
                header: null,
            },
        },
        Detail: {
            screen: DetailScreen,
        },
    },
    {
        initialRouteName: 'Splash',
    },
);

const RootStack = createStackNavigator(
    {
        App: AppNavigator,
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
);

export default createAppContainer(RootStack);
