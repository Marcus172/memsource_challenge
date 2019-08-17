// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { createStackNavigator, createAppContainer } from 'react-navigation';

import ProjectsScreen from 'components/ProjectsScreen.js';
import LoginScreen from 'components/LoginScreen.js';
import SplashScreen from 'components/SplashScreen.js';

const AppNavigator = createStackNavigator(
    {
        Projects: {
            screen: ProjectsScreen,
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
    },
    {
        initialRouteName: 'Splash',
    },
);

export default createAppContainer(AppNavigator);
