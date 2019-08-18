// Copyright (c) 2019, Marek Rom, All rights reserved.

// @flow

import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from 'components/LoginScreen.js';
import ProjectsScreenContainer from 'containers/ProjectsScrenContainer.js';
import SplashScreen from 'components/SplashScreen.js';

const AppNavigator = createStackNavigator(
    {
        Projects: {
            screen: ProjectsScreenContainer,
            navigationOptions: {
                title: 'Projects',
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
    },
    {
        initialRouteName: 'Splash',
    },
);

export default createAppContainer(AppNavigator);
